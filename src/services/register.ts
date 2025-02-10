import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

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
            throw new Error('o email informado ja está cadastrado no sistema')
        }
    
        this.usersRepository.create({
            username,
            email,
            password_hash
        })

    }

}