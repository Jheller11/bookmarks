const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const url = 'http://localhost:4000/videos'
const expect = chai.expect

const { video } = require('./testdata')

describe('Video Controller', () => {
  it('should respond with 200', done => {
    chai
      .request(url)
      .get('/')
      .end(function(error, response) {
        expect(error).to.be.null
        expect(response).to.have.status(200)
        done()
      })
  })
  it('should error when route not found', done => {
    chai
      .request(url)
      .get('/badurl')
      .end(function(error, response) {
        expect(error).to.be.null
        expect(response.text).to.have.string('Please try again.')
        done()
      })
  })
  it('should not accept a new post when not logged in', done => {
    chai
      .request(url)
      .post('/')
      .send(video)
      .end((error, response) => {
        expect(error).to.be.null
        expect(response.text).to.have.string('You must be logged in')
        done()
      })
  })
  it('should respond with 200 for search', done => {
    chai
      .request(url)
      .post('/search')
      .type('form')
      .send({ query: 'test' })
      .end((error, response) => {
        expect(error).to.be.null
        expect(response.text).to.have.string('videos found')
        done()
      })
  })
})