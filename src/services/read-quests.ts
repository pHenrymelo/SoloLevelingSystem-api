import type { QuestsRepository } from "@/repositories/quests-repository"
import type { Quest } from "@prisma/client"
 

interface readQuestsUseCaseResponse {
    quests: Quest[]
}

export class ReadQuestsUseCase {
    constructor(private questsRepository: QuestsRepository) {}
    
    async execute(): Promise <readQuestsUseCaseResponse>{


        const quests = await this.questsRepository.list()
    
        if(!quests) {
              throw new Error()
        }
        
        return{
            quests,
        }

    }
}
