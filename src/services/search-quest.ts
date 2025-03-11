import type { QuestsRepository } from "@/repositories/quests-repository"
import type { Quest } from "@prisma/client"

interface SearchQuestsUseCaseParams {
    query: string
    page: number
} 

interface SearchQuestsUseCaseResponse {
    quests: Quest[]
}

export class SearchQuestsUseCase {
    constructor(private questsRepository: QuestsRepository) {}
    
    async execute({query, page}: SearchQuestsUseCaseParams): Promise <SearchQuestsUseCaseResponse>{

        const quests = await this.questsRepository.searchMany(
            query,
            page
        )

        return{
            quests,
        }
    }
}