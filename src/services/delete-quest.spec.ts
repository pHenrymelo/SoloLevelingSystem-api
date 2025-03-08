import { InMemoryQuestsRepository } from "@/repositories/in-memory/in-memory-quests-repository"
import { DeleteQuestsUseCase } from "./delete-quest"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

let questsRepository: InMemoryQuestsRepository
let sut: DeleteQuestsUseCase

describe('Delete Quests Use Case', () => {

    beforeEach(()=>{
         questsRepository = new InMemoryQuestsRepository()
        sut = new DeleteQuestsUseCase(questsRepository)
    })

    it('shoud to be able to delete a quest', async () => {

        const createdQuest = await questsRepository.create({
            id: "quest1",
            title: 'Coragem do fraco',
            description: 'não desista diante das adversidades',
            userId: '04130211'
        })

        await expect(
            sut.execute({
                id: createdQuest.id
            })
        ).resolves.toBeUndefined()

        const quests = await questsRepository.list("04130211")
        expect(quests).toHaveLength(0)


    })

    it('shoud not to be able to delete a inexistent quest', async () => {

        await expect(()=>
            sut.execute({
                id: "non-existent-id"
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)


    })

})