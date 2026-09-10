import express, { urlencoded } from 'express';
import path from 'node:path';
import categoriesRouter from './routes/categoriesRouter.js';
import itemsRouter from './routes/itemsRouter.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));

app.use(express.json());
app.use(urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('livereload');
  const { default: connectLivereload } = await import('connect-livereload');

  const liveReloadServer = createServer({ extraExts: ['ejs'] });
  liveReloadServer.watch([
    path.join(import.meta.dirname, 'views'),
    path.join(import.meta.dirname, '..', 'public'),
  ]);

  // after a nodemon restart, tell the already-open browser to reload
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => liveReloadServer.refresh('/'), 100);
  });

  app.use(connectLivereload());
}

app.use(express.static(path.join(import.meta.dirname, '..', 'public')));

const PORT = process.env.PORT || 3000;

app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
