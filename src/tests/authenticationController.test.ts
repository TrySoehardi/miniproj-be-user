
import request from "supertest";
import { AppDataSource } from "../typeorm.config";
import { app } from "../index";

beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.synchronize(true); // Clear database before tests
});

afterAll(async () => {
    await AppDataSource.destroy();
});

describe("Authentication API", () => {
    const validUser = {
        email: "testuser@example.com",
        password: "password123"
    };

    test("POST /api/signup - missing email", async () => {
        const response = await request(app)
            .post("/api/signup")
            .send({ password: "password123" });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    test("POST /api/signup - invalid email", async () => {
        const response = await request(app)
            .post("/api/signup")
            .send({ email: "invalidemail", password: "password123" });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    test("POST /api/signin - user not found", async () => {
        const response = await request(app)
            .post("/api/signin")
            .send({ email: "notfound@example.com", password: "password" });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    test("POST /api/signin - missing password", async () => {
        const response = await request(app)
            .post("/api/signin")
            .send({ email: validUser.email });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    test("POST /api/signin - successful signin returns token", async () => {
        // First sign up the user
        await request(app)
            .post("/api/signup")
            .send(validUser);

        // Then sign in
        const response = await request(app)
            .post("/api/signin")
            .send(validUser);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(typeof response.body.token).toBe("string");
    });

    test("POST /api/signin - invalid password", async () => {
        // First sign up the user
        await request(app)
            .post("/api/signup")
            .send(validUser);

        // Then sign in with wrong password
        const response = await request(app)
            .post("/api/signin")
            .send({ email: validUser.email, password: "wrongpassword" });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});
