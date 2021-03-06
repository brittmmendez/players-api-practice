// const expect = require('expect');
// const request = require('supertest');
// const {ObjectID} = require('mongodb');
//
// const {app} = require('./../server');
// const {Player} = require('./../models/player');
// const {User} = require('./../models/user');
// const {players, populatePlayers, users, populateUsers} = require('./seed/seed');
//
// beforeEach(populateUsers);
// beforeEach(populatePlayers);
//
// // describe('POST /players', () => {
// //   it('should create a new player', (done) => {
// //     var text = 'Test player text';
// //
// //     request(app)
// //       .post('/players')
// //       .set('x-auth', users[0].tokens[0].token)
// //       .send({text})
// //       .expect(200)
// //       .expect((res) => {
// //         expect(res.body.text).toBe(text);
// //       })
// //       .end((err, res) => {
// //         if (err) {
// //           return done(err);
// //         }
// //
// //         Player.find({text}).then((players) => {
// //           expect(players.length).toBe(1);
// //           expect(players[0].text).toBe(text);
// //           done();
// //         }).catch((e) => done(e));
// //       });
// //   });
// //
// //   it('should not create player with invalid body data', (done) => {
// //     request(app)
// //       .post('/players')
// //       .set('x-auth', users[0].tokens[0].token)
// //       .send({})
// //       .expect(400)
// //       .end((err, res) => {
// //         if (err) {
// //           return done(err);
// //         }
// //
// //         Player.find().then((players) => {
// //           expect(players.length).toBe(2);
// //           done();
// //         }).catch((e) => done(e));
// //       });
// //   });
// // });
// //
// // describe('GET /players', () => {
// //   it('should get all players', (done) => {
// //     request(app)
// //       .get('/players')
// //       .set('x-auth', users[0].tokens[0].token)
// //       .expect(200)
// //       .expect((res) => {
// //         expect(res.body.players.length).toBe(1);
// //       })
// //       .end(done);
// //   });
// // });
// //
// // describe('GET /players/:id', () => {
// //   it('should return player doc', (done) => {
// //     request(app)
// //       .get(`/players/${players[0]._id.toHexString()}`)
// //       .set('x-auth', users[0].tokens[0].token)
// //       .expect(200)
// //       .expect((res) => {
// //         expect(res.body.player.text).toBe(players[0].text);
// //       })
// //       .end(done);
// //   });
// //
// //   it('should not return player doc created by other user', (done) => {
// //     request(app)
// //       .get(`/players/${players[1]._id.toHexString()}`)
// //       .set('x-auth', users[0].tokens[0].token)
// //       .expect(404)
// //       .end(done);
// //   });
// //
// //   it('should return 404 if player not found', (done) => {
// //     var hexId = new ObjectID().toHexString();
// //
// //     request(app)
// //       .get(`/players/${hexId}`)
// //       .set('x-auth', users[0].tokens[0].token)
// //       .expect(404)
// //       .end(done);
// //   });
// //
// //   it('should return 404 for non-object ids', (done) => {
// //     request(app)
// //       .get('/players/123abc')
// //       .set('x-auth', users[0].tokens[0].token)
// //       .expect(404)
// //       .end(done);
// //   });
// // });
// //
// // describe('DELETE /players/:id', () => {
// //   it('should remove a player', (done) => {
// //     var hexId = players[1]._id.toHexString();
// //
// //     request(app)
// //       .delete(`/players/${hexId}`)
// //       .set('x-auth', users[1].tokens[0].token)
// //       .expect(200)
// //       .expect((res) => {
// //         expect(res.body.player._id).toBe(hexId);
// //       })
// //       .end((err, res) => {
// //         if (err) {
// //           return done(err);
// //         }
// //
// //         Player.findById(hexId).then((player) => {
// //           expect(player).toBeFalsy();
// //           done();
// //         }).catch((e) => done(e));
// //       });
// //   });
// //
// //   it('should remove a player', (done) => {
// //     var hexId = players[0]._id.toHexString();
// //
// //     request(app)
// //       .delete(`/players/${hexId}`)
// //       .set('x-auth', users[1].tokens[0].token)
// //       .expect(404)
// //       .end((err, res) => {
// //         if (err) {
// //           return done(err);
// //         }
// //
// //         Player.findById(hexId).then((player) => {
// //           expect(player).toBeTruthy();
// //           done();
// //         }).catch((e) => done(e));
// //       });
// //   });
// //
// //   it('should return 404 if player not found', (done) => {
// //     var hexId = new ObjectID().toHexString();
// //
// //     request(app)
// //       .delete(`/players/${hexId}`)
// //       .set('x-auth', users[1].tokens[0].token)
// //       .expect(404)
// //       .end(done);
// //   });
// //
// //   it('should return 404 if object id is invalid', (done) => {
// //     request(app)
// //       .delete('/players/123abc')
// //       .set('x-auth', users[1].tokens[0].token)
// //       .expect(404)
// //       .end(done);
// //   });
// // });
// //
// // describe('PATCH /players/:id', () => {
// //   it('should update the player', (done) => {
// //     var hexId = players[0]._id.toHexString();
// //     var text = 'This should be the new text';
// //
// //     request(app)
// //       .patch(`/players/${hexId}`)
// //       .set('x-auth', users[0].tokens[0].token)
// //       .send({
// //         completed: true,
// //         text
// //       })
// //       .expect(200)
// //       .expect((res) => {
// //         expect(res.body.player.text).toBe(text);
// //         expect(res.body.player.completed).toBe(true);
// //         expect(typeof(res.body.player.completedAt)).toBe('number');
// //       })
// //       .end(done);
// //   });
// //
// //   it('should not update the player created by other user', (done) => {
// //     var hexId = players[0]._id.toHexString();
// //     var text = 'This should be the new text';
// //
// //     request(app)
// //       .patch(`/players/${hexId}`)
// //       .set('x-auth', users[1].tokens[0].token)
// //       .send({
// //         completed: true,
// //         text
// //       })
// //       .expect(404)
// //       .end(done);
// //   });
// //
// //   it('should clear completedAt when player is not completed', (done) => {
// //     var hexId = players[1]._id.toHexString();
// //     var text = 'This should be the new text!!';
// //
// //     request(app)
// //       .patch(`/players/${hexId}`)
// //       .set('x-auth', users[1].tokens[0].token)
// //       .send({
// //         completed: false,
// //         text
// //       })
// //       .expect(200)
// //       .expect((res) => {
// //         expect(res.body.player.text).toBe(text);
// //         expect(res.body.player.completed).toBe(false);
// //         expect(res.body.player.completedAt).toBeFalsy();
// //       })
// //       .end(done);
// //   });
// // });
//
// describe('GET /api/users/:id', () => {
//   it('should return user if authenticated', (done) => {
//     request(app)
//       .get('/api/users/:id')
//       .set('x-auth', users[0].tokens[0].token)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body._id).toBe(users[0]._id.toHexString());
//         expect(res.body.email).toBe(users[0].email);
//       })
//       .end(done);
//   });
//
//   it('should return 401 if not authenticated', (done) => {
//     request(app)
//       .get('/api/users/:id')
//       .expect(401)
//       .expect((res) => {
//         expect(res.body).toEqual({});
//       })
//       .end(done);
//   });
// });
//
// describe('POST /api/users', () => {
//   it('should create a user', (done) => {
//     var email = 'example@example.com';
//     var password = '123mnb!';
//
//     request(app)
//       .post('/api/users')
//       .send({email, password})
//       .expect(200)
//       .expect((res) => {
//         expect(res.headers['x-auth']).toBeTruthy();
//         expect(res.body._id).toBeTruthy();
//         expect(res.body.email).toBe(email);
//       })
//       .end((err) => {
//         if (err) {
//           return done(err);
//         }
//
//         User.findOne({email}).then((user) => {
//           expect(user).toBeTruthy();
//           expect(user.password).not.toBe(password);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
//
//   it('should return validation errors if request invalid', (done) => {
//     request(app)
//       .post('/api/users')
//       .send({
//         email: 'and',
//         password: '123'
//       })
//       .expect(400)
//       .end(done);
//   });
//
//   it('should not create user if email in use', (done) => {
//     request(app)
//       .post('/api/users')
//       .send({
//         email: users[0].email,
//         password: 'Password123!'
//       })
//       .expect(400)
//       .end(done);
//   });
// });
//
// describe('POST /api/login', () => {
//   it('should login user and return auth token', (done) => {
//     request(app)
//       .post('/api/login')
//       .send({
//         email: users[1].email,
//         password: users[1].password
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.headers['x-auth']).toBeTruthy();
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//
//         User.findById(users[1]._id).then((user) => {
//           expect(user.tokens[1]).toMatchObject({
//             access: 'auth',
//             token: res.headers['x-auth']
//           });
//           done();
//         }).catch((e) => done(e));
//       });
//   });
//
//   it('should reject invalid login', (done) => {
//     request(app)
//       .post('/api/login')
//       .send({
//         email: users[1].email,
//         password: users[1].password + '1'
//       })
//       .expect(400)
//       .expect((res) => {
//         expect(res.headers['x-auth']).toBeFalsy();
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//
//         User.findById(users[1]._id).then((user) => {
//           expect(user.tokens.length).toBe(1);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
// });
//
// describe('DELETE /api/logout', () => {
//   it('should remove auth token on logout', (done) => {
//     request(app)
//       .delete('/users/me/token')
//       .set('x-auth', users[0].tokens[0].token)
//       .expect(200)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//
//         User.findById(users[0]._id).then((user) => {
//           expect(user.tokens.length).toBe(0);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
// });
