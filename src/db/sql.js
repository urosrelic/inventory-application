// Only purpose of this method is to provide syntax highlighting
export const sql = (strings, ...values) => {
  if (values.length > 0) {
    throw new Error('Dont interpolate`` — use $1, $2 placeholder.');
  }
  return strings.raw[0];
};
