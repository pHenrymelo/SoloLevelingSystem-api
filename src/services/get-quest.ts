import type { QuestsRepository } from "@/repositories/quests-repository"
import type { Quest } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
 

interface GetQuestUseCaseParams{
    id: string
}

interface GetQuestUseCaseResponse {
    quest: Quest
}

export class GetQuestUseCase {
    constructor(private questsRepository: QuestsRepository) {}
    
    async execute({id}: GetQuestUseCaseParams): Promise <GetQuestUseCaseResponse>{


        const quest = await this.questsRepository.findById(id)
    
        if(!quest) {
              throw new ResourceNotFoundError()
        }
        
        return{
            quest,
        }

    }
}
