import { prismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/services/authenticate";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const auth = async (request: FastifyRequest, reply: FastifyReply) => {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {

        const usersRepository = new prismaUsersRepository
        const authenticateUseCase = new AuthenticateUseCase(usersRepository)

        const { user } = await authenticateUseCase.execute({
            email,
            password
        })

        const token = await reply.jwtSign(
            {}, 
            {
            sign: {
                sub: user.id,
            },
        })

        const refreshToken = await reply.jwtSign(
            {}, 
            {
            sign: {
                sub: user.id,
                expiresIn: '7d'
            },
        })

        return reply.setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true
        })
        .status(200).send({
            token
        })

    } catch(err) {
        if (err instanceof InvalidCredentialsError){
            return reply.status(400).send({ message: err.message})
        } 

        return reply.status(500).send()
    }
}