import { InMemoryQuestsRepository } from "@/repositories/in-memory/in-memory-quests-repository"
import { GetQuestUseCase } from "./get-quest"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

let questsRepository: InMemoryQuestsRepository
let sut: GetQuestUseCase

describe('Get Quest Use Case', () => {

    beforeEach(()=>{
         questsRepository = new InMemoryQuestsRepository
         sut = new GetQuestUseCase(questsRepository)
    })

    it('shoud to be able to read a quest details', async () => {

        const createdQuest = await questsRepository.create({
            title: 'Coragem do fraco',
            description: 'não desista diante das adversidades',
            userId: '04130211'
        })

        const {quest} = await sut.execute({
            id: createdQuest.id
        })

        expect(quest.title).toEqual("Coragem do fraco")


    })

    it('shoud not to be able to read a inexistent quest details', async () => {

        await expect( sut.execute({
            id: "non-existent-id"
        })).rejects.toBeInstanceOf(ResourceNotFoundError)


    })

})