const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const url = 'http://localhost:4000/articles'
const expect = chai.expect

describe('Articles Controller', () => {
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
})
