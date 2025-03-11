import type { QuestsRepository } from "@/repositories/quests-repository"
import type { Quest } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface updateQuestsUseCaseParams {
    questId: string,
    title: string,
    description: string,
    completed: boolean
} 

interface updateQuestsUseCaseResponse {
    quest: Quest
}

export class UpdateQuestsUseCase {
    constructor(private questsRepository: QuestsRepository) {}
    
    async execute({questId, title, description, completed}: updateQuestsUseCaseParams): Promise <updateQuestsUseCaseResponse>{

        const quest = await this.questsRepository.update(questId,
        {
            title,
            description,
            completed,
        })

        if(!quest){
            throw new ResourceNotFoundError()
        }

        return{
            quest,
        }
    }
}