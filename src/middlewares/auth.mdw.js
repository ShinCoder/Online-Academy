export default function auth(authority) {
  return function (req, res, next) {
    if (!req.session.auth) {
      return res.redirect('/auth/sign-in');
    }

    if (req.session.authUser.authority != authority) {
      return res.render('403', { layout: false });
    }

    next();
  };
}
