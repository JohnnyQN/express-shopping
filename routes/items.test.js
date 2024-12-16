process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const Item = require("../item");

let item = { name: "silly", price: 200 };

beforeEach(() => {
    Item.clear(); // Clear existing items
    new Item("silly", 200); // Add the required item for the test
  });

/** GET /items - returns { items: [item, ...] } */
describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const response = await request(app).get("/items");
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0]).toEqual(item);
  });
});

/** GET /items/:name - return data about one item */
describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });

  test("Responds with 404 if item not found", async function () {
    const response = await request(app).get("/items/nonexistent");
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("No items found");
  });
});

/** POST /items - create a new item */
describe("POST /items", function () {
  test("Creates a new item", async function () {
    const response = await request(app)
      .post("/items")
      .send({ name: "Taco", price: 5 });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual({ name: "Taco", price: 5 });
  });

  test("Responds with 400 for invalid data", async function () {
    const response = await request(app)
      .post("/items")
      .send({ name: "", price: -1 });
    expect(response.statusCode).toBe(400);
  });
});

/** PATCH /items/:name - update item */
describe("PATCH /items/:name", function () {
  test("Updates a single item", async function () {
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send({ name: "Updated Name", price: 300 });
    expect(response.statusCode).toBe(200);
    expect(response.body.item.name).toEqual("Updated Name");
    expect(response.body.item.price).toEqual(300);
  });

  test("Responds with 404 if item not found", async function () {
    const response = await request(app).patch("/items/nonexistent");
    expect(response.statusCode).toBe(404);
  });
});

/** DELETE /items/:name - delete item */
describe("DELETE /items/:name", function () {
  test("Deletes a single item", async function () {
    const response = await request(app).delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
    expect(Item.findAll()).toHaveLength(0);
  });

  test("Responds with 404 if item not found", async function () {
    const response = await request(app).delete("/items/nonexistent");
    expect(response.statusCode).toBe(404);
  });
});

/** GET /items/search - search items */
describe("GET /items/search", function () {
    test("Searches for items by name", async function () {
      console.log("Testing search with existing item...");
      const response = await request(app).get("/items/search?name=silly");
      console.log("Test Response (Matching Item):", response.body); // Debugging log
      expect(response.statusCode).toBe(200); // Expect 200 when an item is found
      expect(response.body.items).toHaveLength(1); // Ensure only one match
      expect(response.body.items[0].name).toBe("silly");
    });
  
    test("Responds with empty array if no matching items", async function () {
      console.log("Testing search with no matches...");
      const response = await request(app).get("/items/search?name=nonexistent");
      console.log("Test Response (No Matches):", response.body); // Debugging log
      expect(response.statusCode).toBe(200); // Should be 200 with empty results
      expect(response.body.items).toHaveLength(0); // No items found
    });
  
    test("Responds with 400 for missing query", async function () {
      console.log("Testing search with missing query...");
      const response = await request(app).get("/items/search");
      console.log("Test Response (Missing Query):", response.body); // Debugging log
      expect(response.statusCode).toBe(400); // Ensure 400 is returned
      expect(response.body.error).toBe("Search query is required");
    });
  });
  
  
  
