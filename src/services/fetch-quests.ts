import type { QuestsRepository } from "@/repositories/quests-repository"
import type { Quest } from "@prisma/client"
 
interface FetchQuestsUseCaseRequest{
    userId: string
}

interface FetchQuestsUseCaseResponse {
    quests: Quest[]
}

export class FetchQuestsUseCase {
    constructor(private questsRepository: QuestsRepository) {}
    
    async execute({userId}:FetchQuestsUseCaseRequest): Promise <FetchQuestsUseCaseResponse>{


        const quests = await this.questsRepository.list(userId)
        
        return{
            quests,
        }

    }
}
