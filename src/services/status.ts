import { UsersRepository } from "@/repositories/users-repository"

export class StatusUseCase {
    constructor( private usersRepository: UsersRepository){}

    async execute(id: string) {

    
        const user = await this.usersRepository.findById(id)
        
        return user

    }

}