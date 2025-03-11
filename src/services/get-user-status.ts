import { UsersRepository } from "@/repositories/users-repository"
import type { User } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface GetStatusUseCaseRequest{
    userId: string
}

interface GetStatusUseCaseResponse {
    user: User
}

export class GetStatusUseCase {
    constructor( private usersRepository: UsersRepository){}

    async execute({userId}:GetStatusUseCaseRequest): Promise <GetStatusUseCaseResponse> {
    
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user,
        }

    }

}