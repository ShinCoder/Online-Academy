import express from 'express';
import asyncErrors from 'express-async-errors';
import methodOverride from 'method-override';

import bodyParser from 'body-parser';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import activateRoute from './middlewares/route.mdw.js';
import activateViewEngine from './middlewares/views.mdw.js';
import activateSession from './middlewares/session.mdw.js';
import activate_resLocals from './middlewares/locals.mdw.js';
import activateError from './middlewares/error.mdw.js';
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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

activateSession(app);
activate_resLocals(app);
activateRoute(app);
activateViewEngine(app, __dirname);
activateError(app);

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Online Academy App listening at http://localhost:${PORT}`);
});
