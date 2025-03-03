import { InMemoryQuestsRepository } from "@/repositories/in-memory/in-memory-quests-repository"
import { ReadQuestUseCase } from "./read-quest"

let questsRepository: InMemoryQuestsRepository
let sut: ReadQuestUseCase

describe('Read Quest Use Case', () => {

    beforeEach(()=>{
         questsRepository = new InMemoryQuestsRepository
         sut = new ReadQuestUseCase(questsRepository)
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

})