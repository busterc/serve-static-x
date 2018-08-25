# serve-static-x [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/busterc/serve-static-x.svg)](https://greenkeeper.io/)

> Serve static files with cache busting capability; 
> uses [`Express.static()`](http://expressjs.com/4x/api.html#express.static) aka [serve-static](https://github.com/expressjs/serve-static)

Use it just like [serve-static](https://github.com/expressjs/serve-static) except now you can set an additional option named "x" that enables a custom (secret) request header to be used to bypass receiving static files.

- Use in conjunction with [`save-static`](https://github.com/busterc/save-static) for caching and re-caching files to disk.

## Install

```sh
$ npm install --save serve-static-x
```


## Usage

```js
var express = require('express');
var serveStaticX = require('serve-static-x');

var app = express();

var staticPath = path.join(__dirname, '/static/html'); // <= for example

// this is where the magic happens
app.use(serveStaticX(staticPath, {
  x: 'x-my-secret-cache-busting-header'
}));

```

## License

ISC © [Buster Collings](https://about.me/buster)


[npm-image]: https://badge.fury.io/js/serve-static-x.svg
[npm-url]: https://npmjs.org/package/serve-static-x
[travis-image]: https://travis-ci.org/busterc/serve-static-x.svg?branch=master
[travis-url]: https://travis-ci.org/busterc/serve-static-x
[daviddm-image]: https://david-dm.org/busterc/serve-static-x.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/busterc/serve-static-x
