import { FastifyInstance } from "fastify";
import { register } from "@/http/controllers/register";
import { auth } from "../controllers/authenticate";
import { status } from "../controllers/status";

export const userRoutes = async (app: FastifyInstance) => {
    app.post("/register", register)
    app.post("/session", auth)

    app.get("/status", status)
}