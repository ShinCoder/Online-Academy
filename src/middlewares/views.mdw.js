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
        ratingpointFormat: (val) => {
          return numeral(val).format('0.0');
        },
        vietnamdongFormat: (val) => {
          return numeral(val).format('0,0').replace(/,/g, '.') + 'đ';
        },
        ifEquals: (a, b, option) => {
          return a == b ? option : '';
        },
        sum: (a, b) => a + b,
        log: (a) => {
          console.log(a);
        }
      }
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', dirname + '/resources/views');
}
