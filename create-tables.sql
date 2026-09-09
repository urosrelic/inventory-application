create schema inventory_app;

create table categories
(
    id   int generated always as identity primary key,
    name varchar(255) not null,
    description TEXT
);

create table items
(
    id          int generated always as identity primary key,
    price       numeric(10, 2) not null,
    name        varchar(255)   not null,
    description text           not null,
    category_id integer references categories (id)
);

create type stock_movement_type as ENUM('IN', 'OUT');

create table stock_movements
(
    id            int generated always as identity primary key,
    item_id       integer references items (id),
    quantity      integer             not null,
    movement_type stock_movement_type not null,
    created_at    TIMESTAMPTZ DEFAULT NOW()
);
