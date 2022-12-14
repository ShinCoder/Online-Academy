import express from 'express';

const app = express();
app.use('/public', express.static('public'));
app.use(
  express.urlencoded({
    extended: true
  })
);

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Online Academy App listening at http://localhost:${PORT}`);
});
