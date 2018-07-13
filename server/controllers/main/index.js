export function indexPage(req, res) {
  res.render('index', {
    title: req.app.locals.title,
    content: req.app.locals.content,
    path: req.path,
  });
}

export function mapPage(req, res) {
  res.render('map', {
    title: req.app.locals.title,
    content: req.app.locals.content,
    path: req.path,
  });
}
