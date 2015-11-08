import http from 'http';
import path from 'path';
import assert from 'assert';
import client from 'request';
import express from 'express';
import serveStaticX from '../lib';

describe('serve-static-x', function () {

  var baseUrl = 'http://127.0.0.1:';
  var server;
  var page;

  before(() => {
    var app = express();
    var staticPath = path.join(__dirname, '/static');

    app.set('views', __dirname);
    app.set('view engine', 'jade');

    app.use(serveStaticX(staticPath, {
      x: 'x-my-secret-cache-busting-header',
      extensions: ['html']
    }));

    app.get('/', (request, response) => {
      response.render('isStatic', {
        isStatic: false
      });
    });

    server = http.createServer(app)
      .listen();
    baseUrl += server.address()
      .port;
    page = baseUrl;
  });

  after(() => {
    server.close();
  });

  it('requires a root path for init', done => {
    try {
      /*eslint no-unused-vars:0*/
      var failedServeStaticX = serveStaticX();
      var noFailError = new Error('serveStaticX() should have failed');
      done(noFailError);
    } catch (initError) {
      done();
    }
  });

  it('should get a static response', function (done) {
    client(page + '/ftw', function (error, response, body) {
      var result = body.match('ftw');
      assert(result);
      done();
    });
  });

  it('should get a static response for an index page', function (done) {
    client(page + '/', function (error, response, body) {
      var result = body.match('true');
      assert(result);
      done();
    });
  });

  it('should NOT get a static response', function (done) {
    client({
      url: page,
      headers: {
        'x-my-secret-cache-busting-header': 'anything'
      }
    }, function (error, response, body) {
      var result = body.match('false');
      assert(result);
      done();
    });
  });

});
