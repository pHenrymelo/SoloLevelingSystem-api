import { FastifyRequest, FastifyReply } from "fastify"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/db/prisma"
import { z } from "zod"

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodSchema = z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(8)
    })

    const { username, email, password } = registerBodSchema.parse(request.body)

    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameEmail) {
        return reply.status(409).send()
    }
    
    await prisma.user.create({
        data: {
            username,
            email,
            password_hash
        }
    })

    return reply.status(201).send()

}