let request = require("superagent"),
  expect = require("chai").expect,
  urlProvider = require("../util/urlProvider"),
  url = urlProvider("/first-level-auth-test");

describe("The first level authentication", () => {

  let agent = request;

  describe("when valid token is present", () => {

    let validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmFjdGljZU5hbWUiOiJjYW50YWhlYWx0aCIsImlhdCI6MTQ4MjM5NjE2NSwiZXhwIjoxNTEzOTMyMTY1fQ.9UsC8BzokREFOFBbGFKVNzBIu15W_f7nKPO_4g1XUGk";

    it("should pass a post request", done => {

      agent
        .post(url)
        .send({"foo": "bar"})
        .set("Authorization", `Bearer ${validToken}`)
        .end((err, result) => {
          if (err) {
            return done(err);
          }
          expect(result.status).to.be.equal(200);
          expect(result.body).to.be.an("array");
          done();
        });
    });

    it("should pass a put request", done => {

      agent
        .put(url)
        .send({"foo": "bar"})
        .set("Authorization", `Bearer ${validToken}`)
        .end((err, result) => {
          if (err) {
            return done(err);
          }
          expect(result.status).to.be.equal(200);
          expect(result.body).to.be.an("array");
          done();
        });
    });

    it("should pass a get request", done => {

      agent
        .get(url)
        .set("Authorization", `Bearer ${validToken}`)
        .end((err, result) => {
          if (err) {
            return done(err);
          }
          expect(result.status).to.be.equal(200);
          expect(result.body).to.be.an("array");
          done();
        });
    });

    it("should pass a del request", done => {

      agent
        .del(url)
        .set("Authorization", `Bearer ${validToken}`)
        .end((err, result) => {
          if (err) {
            return done(err);
          }
          expect(result.status).to.be.equal(200);
          expect(result.body).to.be.an("array");
          done();
        });
    });
  });
});
