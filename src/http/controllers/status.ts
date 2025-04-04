import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { StatusUseCase } from "@/services/get-user-status";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import type { FastifyReply, FastifyRequest } from "fastify";

export const status = async (request: FastifyRequest, reply: FastifyReply) => {
    
        await request.jwtVerify()

        const usersRepository = new PrismaUsersRepository
        const statusUseCase = new StatusUseCase(usersRepository)

        const user = await statusUseCase.execute(request.user.sub)
        
        return reply.status(200).send({
            username: user?.username
        })
}