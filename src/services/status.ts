import { UsersRepository } from "@/repositories/users-repository"
import type { User } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface StatusUseCaseRequest{
    userId: string
}

interface StatusUseCaseResponse {
    user: User
}

export class StatusUseCase {
    constructor( private usersRepository: UsersRepository){}

    async execute({userId}:StatusUseCaseRequest): Promise <StatusUseCaseResponse> {
    
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user,
        }

    }

}