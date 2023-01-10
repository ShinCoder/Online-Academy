export default function auth(allowAuthorities) {
  return function (req, res, next) {
    if (!req.session.auth) {
      return res.redirect('/auth/sign-in');
    }

    if (!allowAuthorities.includes(req.session.authUser.authority)) {
      return res.render('403', { layout: false });
    }

    next();
  };
}
