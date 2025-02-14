import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import type { User } from "@prisma/client"

interface registerUCParams {
    username: string,
    email: string,
    password: string
}

interface registerUCResponse {
    user: User
}

export class RegisterUseCase {
    constructor( private usersRepository: UsersRepository){}

    async execute({username, email, password}: registerUCParams): Promise <registerUCResponse> {

        const password_hash = await hash(password, 6)

        const sameEmailUser = await this.usersRepository.findByEmail(email)

        if (sameEmailUser) {
            throw new UserAlreadyExistsError()
        }
    
        const user = await this.usersRepository.create({
            username,
            email,
            password_hash
        })

        return {
            user,
        }
    }

}