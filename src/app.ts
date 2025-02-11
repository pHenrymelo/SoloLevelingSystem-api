import fastify from "fastify";
import { userRoutes } from "./http/routes/users";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors"

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '15m'
    }
})

app.register(fastifyCookie)

app.register(fastifyCors, {
    origin: '*'
})

app.register(userRoutes)

app.setErrorHandler((error, _request, reply) => {
    if(error instanceof ZodError) {
        return reply.status(400)
        .send({ message: 'Validation error', issues: error.format})
    }

    if(env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // enviar log para ferramenta externa
    }

    return reply.status(500).send({ message: 'Internal server error' })
})