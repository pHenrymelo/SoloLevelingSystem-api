import { InMemoryQuestsRepository } from "@/repositories/in-memory/in-memory-quests-repository"
import { DeleteQuestsUseCase } from "./delete-quest"

let questsRepository: InMemoryQuestsRepository
let sut: DeleteQuestsUseCase

describe('Delete Quests Use Case', () => {

    beforeEach(()=>{
         questsRepository = new InMemoryQuestsRepository
        sut = new DeleteQuestsUseCase(questsRepository)
    })

    it('shoud to be able to delete a quest', async () => {

        const createdQuest = await questsRepository.create({
            title: 'Coragem do fraco',
            description: 'não desista diante das adversidades',
            userId: '04130211'
        })

        await expect(()=>
            sut.execute({
                id: createdQuest.id
            })
        ).resolves


    })

})