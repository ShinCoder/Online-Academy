import { engine } from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';

export default function (app, dirname) {
  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      defaultLayout: 'main',
      helpers: {
        section: hbs_sections()
      }
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', dirname + '/views');
}
