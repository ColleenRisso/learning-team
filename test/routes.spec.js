const expect = require("chai").expect;
const request = require("supertest");

const app = require("../server/app");
const agent = request.agent(app);

const { db, Unicorn } = require("../server/unicorn");

describe("All Unicorn Route: ", () => {
  before(() => {
    return db.sync({ force: true });
  });

  afterEach(() => {
    return db.sync({ force: true });
  });

  describe("GET /unicorns", () => {
    it("responds with an array via JSON", () => {
      return agent
        .get("/api/unicorns")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body).to.have.length(0);
        });
    });
    it("returns unicorn if there is one", () => {
      let unicorn = Unicorn.create({
        name: "Mr. Unicorn",
        age: 30
      });
      return agent
        .get("/api/unicorns")
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body).to.have.length(1);
          expect(res.body[0].name).to.equal("Mr. Unicorn");
        });
    });
  });
  describe("GET /api/unicorns/:id", () => {
    let unicorn1;
    beforeEach(async () => {
      let array = await Promise.all([
        Unicorn.create({
          name: "Princess Unicorn",
          age: 11
        }),
        Unicorn.create({
          name: "Little Miss Unicorn",
          age: 19
        }),
        Unicorn.create({
          name: "Pretty Pretty Unicorn",
          age: 50
        })
      ]);
      unicorn1 = array[0];
    });
    it("returns the JSON of the article based on the id", () => {
      return agent
        .get("/api/unicorns/" + unicorn1.id)
        .expect(200)
        .expect(res => {
          if (typeof res.body === "string") {
            res.body = JSON.parse(res.body);
          }
          expect(res.body.name).to.equal("Princess Unicorn");
        });
    });
  });
  describe("POST /api/unicorns/", () => {
    it("creates a new unicorn", () => {
      return agent
        .post("/api/unicorns")
        .send({
          name: "Happy The Unicorn",
          age: 21
        })
        .expect(200)
        .expect(res => expect(res.body.name).to.equal("Happy The Unicorn"));
    });
  });
});
