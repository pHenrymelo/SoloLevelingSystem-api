import { FastifyRequest, FastifyReply } from "fastify"
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error"
import { makeRegisterUseCase } from "@/services/factories/make-register-use-case"
import { z } from "zod"

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(8)
    })

    const { username, email, password } = registerBodySchema.parse(request.body)

    try {

            const registerUseCase = makeRegisterUseCase()

            await registerUseCase.execute({
            username,
            email,
            password
        }) 

    } catch(err) {
        
        if(err instanceof UserAlreadyExistsError){
            return reply.status(409).send({message: err.message})
        } 

        return reply.status(500).send()
        

    }

    return reply.status(201).send()

}