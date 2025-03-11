import type { QuestsRepository } from "@/repositories/quests-repository"
import type { Quest } from "@prisma/client"

interface createQuestsUseCaseParams {
    title: string,
    description: string,
    userId: string
} 

interface createQuestsUseCaseResponse {
    quest: Quest
}

export class CreateQuestsUseCase {
    constructor(private questsRepository: QuestsRepository) {}
    
    async execute({title, description, userId}: createQuestsUseCaseParams): Promise <createQuestsUseCaseResponse>{

        const quest = await this.questsRepository.create({
            title,
            description,
            userId
        })

        return{
            quest,
        }
    }
}