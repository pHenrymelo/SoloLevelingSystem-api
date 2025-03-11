import type { QuestsRepository } from "@/repositories/quests-repository"
import type { Quest } from "@prisma/client"
 
interface FetchQuestsUseCaseRequest{
    userId: string
    page: number
}

interface FetchQuestsUseCaseResponse {
    quests: Quest[]
}

export class FetchQuestsUseCase {
    constructor(private questsRepository: QuestsRepository) {}
    
    async execute({userId, page}:FetchQuestsUseCaseRequest): Promise <FetchQuestsUseCaseResponse>{


        const quests = await this.questsRepository.list(userId, page)
        
        return{
            quests,
        }

    }
}
