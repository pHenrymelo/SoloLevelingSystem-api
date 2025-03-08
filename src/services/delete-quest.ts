import type { QuestsRepository } from "@/repositories/quests-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface deleteQuestsUseCaseParams {
    id: string
} 

export class DeleteQuestsUseCase {
    constructor(private questsRepository: QuestsRepository) {}
    
    async execute({id}: deleteQuestsUseCaseParams): Promise<void>{

        const deleted = await this.questsRepository.delete(id)
        
        if (!deleted) {
            throw new ResourceNotFoundError()
        }


    }
}