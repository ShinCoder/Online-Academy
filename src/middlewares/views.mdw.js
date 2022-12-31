import { engine } from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';
import numeral from 'numeral';

export default function (app, dirname) {
  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      defaultLayout: 'main',
      helpers: {
        section: hbs_sections(),
        starify: (s) => {
          if (s == 0) return '<i class="fa fa-star-half-o"></i>';
          if (s == 1) return '<i class="fa fa-star"></i>';
          else return '<i class="fa fa-star-o"></i>';
        },
        vietnamdongFormat: (val) => {
          return numeral(val).format('0,0.000').replaceAll(',', '.') + 'đ';
        }
      }
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', dirname + '/resources/views');
}
