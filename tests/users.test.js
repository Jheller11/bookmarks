const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const url = 'http://localhost:4000/users'
const expect = chai.expect

describe('User Controller', () => {
  it('server should respond with 200 for login', done => {
    chai
      .request(url)
      .get('/login')
      .end(function(error, response) {
        expect(error).to.be.null
        expect(response).to.have.status(200)
        done()
      })
  })
  it('server should respond with 200 for signup', done => {
    chai
      .request(url)
      .get('/signup')
      .end(function(error, response) {
        expect(error).to.be.null
        expect(response).to.have.status(200)
        done()
      })
  })
  it('should block profile page when not logged in', done => {
    chai
      .request(url)
      .get('/profile')
      .end(function(error, response) {
        expect(error).to.be.null
        expect(response.text).to.have.string('You must be logged in')
        done()
      })
  })
})
