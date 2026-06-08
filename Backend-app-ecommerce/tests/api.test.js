const request = require("supertest");
const app = require("../app");
const pool = require("../data/database");

const testUser = {
  name: "Usuario Test",
  email: `test${Date.now()}@andesora.com`,
  password: "123456",
};

let token;

afterAll(async () => {
  await pool.end();
});

describe("API Andesora", () => {
  test("GET / debe responder 200", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "API Andesora funcionando correctamente"
    );
  });

  test("POST /api/auth/register debe registrar usuario", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.email).toBe(testUser.email);
  });

  test("POST /api/auth/login debe iniciar sesión y devolver token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");

    token = response.body.token;
  });

  test("GET /api/products debe devolver productos", async () => {
    const response = await request(app).get("/api/products");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /api/products sin token debe responder 401", async () => {
    const response = await request(app)
      .post("/api/products")
      .send({
        name: "Producto Test",
        price: 10000,
        description: "Producto de prueba",
        image: "",
        category: "Tecnología",
      });

    expect(response.statusCode).toBe(401);
  });

  test("POST /api/products con token debe crear producto", async () => {
    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Producto Test",
        price: 10000,
        description: "Producto de prueba",
        image: "",
        category: "Tecnología",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("product");
    expect(response.body.product.name).toBe("Producto Test");
  });
});