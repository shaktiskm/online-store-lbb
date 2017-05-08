let request = require("superagent"),
  expect = require("chai").expect,
  urlProvider = require("../util/urlProvider"),
  url = urlProvider("/first-level-auth-test");

describe("The first level authentication", () => {

  let agent = request;

  describe("when valid token is present", () => {

    let validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzaGFrdGlza21AZ21haWwuY29tIiwiaWF0IjoxNDk0MjQyMTA1LCJleHAiOjE0OTQ4NDY5MDV9.AtJNVBg-jvDkr3oX8gb50BNj_i9rfxEdzHz3akUu8fk";

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
