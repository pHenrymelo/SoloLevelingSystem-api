import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface registerUCParams {
    username: string,
    email: string,
    password: string
}

export class RegisterUseCase {
    constructor( private usersRepository: UsersRepository){}

    async execute({username, email, password}: registerUCParams) {

        const password_hash = await hash(password, 6)

        const sameEmailUser = await this.usersRepository.findByEmail(email)

        if (sameEmailUser) {
            throw new UserAlreadyExistsError()
        }
    
        this.usersRepository.create({
            username,
            email,
            password_hash
        })

    }

}