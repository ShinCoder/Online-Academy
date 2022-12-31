import express from 'express';
import methodOverride from 'method-override';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import activateRoute from './middlewares/route.mdw.js';
import activateViewEngine from './middlewares/views.mdw.js';
import activateSession from "./middlewares/session.mdw.js";

const app = express();
// static path
app.use(express.static(__dirname + '/public'));
// body parser
app.use(
  express.urlencoded({
    extended: true
  })
);
// method override
app.use(methodOverride('_method'));


activateSession(app);
activateRoute(app);
activateViewEngine(app, __dirname);

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Online Academy App listening at http://localhost:${PORT}`);
});
