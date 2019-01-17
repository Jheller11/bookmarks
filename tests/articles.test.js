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
})
