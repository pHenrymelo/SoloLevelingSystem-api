import type { QuestsRepository } from "@/repositories/quests-repository"

interface deleteQuestsUseCaseParams {
    id: string
} 

export class DeleteQuestsUseCase {
    constructor(private questsRepository: QuestsRepository) {}
    
    async execute({id}: deleteQuestsUseCaseParams){

    await this.questsRepository.delete(id)

    }
}