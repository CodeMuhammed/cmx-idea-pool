const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../');
const User = require('../models/user');

const testUsers = [
    {
        'email': 'jack-black@codementor.io',
        'name': 'Jack Black',
        'password': 'the-Secret-123'
    }
];

const testIdea = {
    'content': 'the-content',
    'impact': 8,
    'ease': 8,
    'confidence': 8
};

let createdIdea = {};

let authToken = {};

describe('CMX idea pool authentication', () => {
    before((done) => {
        // @TODO login a default user to get the auth tokens
        let testusersEmails = testUsers.map(user => user.email);
        User.remove({ email: { '$in': testusersEmails } }, (err, stats) => {
            if (err) throw new Error('Cannot run test because we are unable to connect to DB');
            request(app)
                .post('/users')
                .set('Accept', 'application/json')
                .send(testUsers[0])
                .end((err, res) => {
                    if (res) {
                        authToken = res.body;
                        return done();
                    }
                    return done(err);
                });
        });
    });

    describe('POST: /ideas', () => {
        it('should create a new idea for this logged in user ', (done) => {
            request(app)
                .post('/ideas')
                .set('Accept', 'application/json')
                .set('x-access-token', authToken.jwt)
                .send(testIdea)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res) {
                        createdIdea = res.body;
                        expect(createdIdea._id).not.to.be.undefined;
                        return done();
                    }
                    return done(err);
                });
        });
    });

    describe('PUT: /ideas', () => {
        it('should update an already created idea', (done) => {
            request(app)
                .put(`/ideas/${createdIdea._id}`)
                .set('Accept', 'application/json')
                .set('x-access-token', authToken.jwt)
                .send(createdIdea)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res) {
                        return done();
                    }
                    return done(err);
                });
        });
    });

    describe('GET: /ideas', () => {
        it('should get all ideas created by this user', (done) => {
            request(app)
                .get(`/ideas`)
                .set('Accept', 'application/json')
                .set('x-access-token', authToken.jwt)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res) {
                        return done();
                    }
                    return done(err);
                });
        });
    });

    describe('DELETE: /ideas', () => {
        it('should get all ideas created by this user', (done) => {
            request(app)
                .delete(`/ideas/${createdIdea._id}`)
                .set('Accept', 'application/json')
                .set('x-access-token', authToken.jwt)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res) {
                        return done();
                    }
                    return done(err);
                });
        });
    });
});
