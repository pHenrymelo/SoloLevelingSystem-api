import type { QuestsRepository } from "@/repositories/quests-repository"
import type { Quest } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
 

interface readQuestUseCaseParams{
    id: string
}

interface readQuestUseCaseResponse {
    quest: Quest
}

export class ReadQuestUseCase {
    constructor(private questsRepository: QuestsRepository) {}
    
    async execute({id}: readQuestUseCaseParams): Promise <readQuestUseCaseResponse>{


        const quest = await this.questsRepository.findById(id)
    
        if(!quest) {
              throw new ResourceNotFoundError()
        }
        
        return{
            quest,
        }

    }
}
