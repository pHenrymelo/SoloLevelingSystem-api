import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { InvalidEmailError } from "./errors/invalid-email-error"
import { UsersRepository } from "@/repositories/users-repository"
import type { User } from "@prisma/client"
import { hash } from "bcryptjs"
import { InvalidPasswordError } from "./errors/invalid-password-error"

interface registerUseCaseParams {
    username: string,
    email: string,
    password: string
}

interface registerUCResponse {
    user: User
}

export class RegisterUseCase {
    constructor( private usersRepository: UsersRepository){}

    async execute({username, email, password}: registerUseCaseParams): Promise <registerUCResponse> {

        if(!email.includes('@') || !email.includes('.')) {
            throw new InvalidEmailError()
        }

        if(password.length < 8) {
            throw new InvalidPasswordError()
        }

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