import { FastifyRequest, FastifyReply } from "fastify"
import { RegisterUseCase } from "@/services/register"
import { prismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { z } from "zod"


export const register = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodSchema = z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(8)
    })

    const { username, email, password } = registerBodSchema.parse(request.body)

    try {
        const usersRepository = new prismaUsersRepository
        const registerUseCase = new RegisterUseCase(usersRepository)

            await registerUseCase.execute({
            username,
            email,
            password
        }) 

    } catch(err) {
        console.log(err)
        return reply.status(409).send()
    }

    return reply.status(201).send()

}