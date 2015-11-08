import ServeStatic from 'serve-static';

export default (root, options = {}) => {
  if (!root) {
    throw new TypeError('root path must be provided');
  }

  var x = options.x || null;

  var serveStatic = new ServeStatic(root, options);

  return (request, response, next) => {
    if (!x || !request.headers[x]) {
      return serveStatic(request, response, next);
    }
    next();
  };
};
