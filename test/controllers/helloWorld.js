var request = require('supertest');
var app = require('../../server.js');
var jwt = require('jsonwebtoken');

describe('GET /hello-world', function () {
    it('it responds with 401 status code if no authorization header', function (done) {
        request(app).get('/api/hello-world').expect(401).end(function (err, res) {
            if (err) return done(err);
            done();
        });
    });

    it('it responds with JSON if no authorization header', function (done) {
        request(app).get('/api/hello-world').expect('Content-Type', /json/).end(function (err, res) {
            if (err) return done(err);
            done();
        });
    });

    it('it responds with 200 status code if good authorization header', function (done) {
        var token = jwt.sign({
            id: 1,
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
        request(app)
            .get('/api/hello-world')
            .set('Authorization', token)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('it responds with JSON if good authorization header', function (done) {
        var token = jwt.sign({
            id: 1,
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
        request(app)
            .get('/api/hello-world')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('it responds with 401 status code if invalid authorization header', function (done) {
        var token = jwt.sign({
            id: 1,
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
        request(app)
            .get('/api/hello-world')
            .set('Authorization', 'invalid token')
            .expect(401).end(function (err, res) {
                if (err) return done(err);
                done()
            })
    });
});