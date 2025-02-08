import { FastifyInstance } from "fastify";
import { register } from "@/http/controllers/register";

export const userRoutes = async (app: FastifyInstance) => {
    app.post("/register", register)
}