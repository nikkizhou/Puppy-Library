import app from './app';
const port = 5000;

app.listen(port, (): void => {
  console.log(`Listening on port ${port}`);
});
