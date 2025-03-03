import type { QuestsRepository } from "@/repositories/quests-repository"
import type { Quest } from "@prisma/client"

interface updateQuestsUseCaseParams {
    questId: string,
    title: string,
    description: string,
    completed: boolean
} 

interface updateQuestsUseCaseResponse {
    quest: Quest | null
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

        return{
            quest,
        }
    }
}