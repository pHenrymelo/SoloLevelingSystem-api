import { FastifyInstance } from "fastify";
import { register } from "@/http/controllers/register";
import { auth } from "../controllers/authenticate";
import { status } from "../controllers/status";
import { refresh } from "../controllers/refresh";

export const userRoutes = async (app: FastifyInstance) => {
    app.post("/register", register)
    app.post("/session", auth)

    app.patch('/token/refresh', refresh)

    app.get("/status", status)
}