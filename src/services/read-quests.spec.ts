import { InMemoryQuestsRepository } from "@/repositories/in-memory/in-memory-quests-repository"
import { ReadQuestsUseCase } from "./read-quests"


let questsRepository: InMemoryQuestsRepository
let sut: ReadQuestsUseCase

describe('Read Quests Use Case', () => {

    beforeEach(()=>{
         questsRepository = new InMemoryQuestsRepository
         sut = new ReadQuestsUseCase(questsRepository)
    })

    it('shoud to be able to fetch quests', async () => {

        await questsRepository.create({
            title: 'Coragem do fraco',
            description: 'não desista diante das adversidades',
            userId: '04130211'
        })

        const {quests} = await sut.execute()

        expect(quests[0].id).toEqual(expect.any(String))


    })

})