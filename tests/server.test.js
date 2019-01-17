const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const url = 'http://localhost:4000'
const expect = chai.expect

describe('Server', () => {
  it('server should respond with 200', done => {
    chai
      .request(url)
      .get('/')
      .end(function(error, response) {
        expect(error).to.be.null
        expect(response).to.have.status(200)
        done()
      })
  })
  it('should redirect to articles index page', done => {
    chai
      .request(url)
      .get('/')
      .end(function(error, response) {
        expect(error).to.be.null
        expect(response.redirects).to.have.length(1)
        expect(response.redirects[0]).to.equal('http://localhost:4000/articles')
        done()
      })
  })
  it('should return my 404 message when route not found', done => {
    chai
      .request(url)
      .get('/badurl')
      .end(function(error, response) {
        expect(error).to.be.null
        expect(response.text).to.have.string(
          'The page you requested does not exist. Please try again.'
        )
        done()
      })
  })
})
