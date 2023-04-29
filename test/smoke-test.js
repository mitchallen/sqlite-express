const assert = require('assert');
const request = require('supertest');
const server = require('../server');

describe('User API', () => {
  let userId;

  after(() => {
    // do some final cleanup after all tests have run
    console.log("closing server")
    server.close()
  });

  it('should create a new user', (done) => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
    request(server)
      .post('/users')
      .send(user)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        userId = res.body.id;
        assert.strictEqual(typeof userId, 'number');
        done();
      });
  });

  it('should return all users', (done) => {
    request(server)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(Array.isArray(res.body), true);
        done();
      });
  });

  it('should return a specific user', (done) => {
    request(server)
      .get(`/users/${userId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.id, userId);
        done();
      });
  });

  it('should update a user', (done) => {
    const user = {
      name: 'Jane Doe',
      email: 'janedoe@example.com',
    };
    request(server)
      .put(`/users/${userId}`)
      .send(user)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, 'User updated');
        done();
      });
  });

  it('should delete a user', (done) => {
    request(server)
      .delete(`/users/${userId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, 'User deleted');
        done();
      });
  });


});
