
import { InMemoryQuestsRepository } from "@/repositories/in-memory/in-memory-quests-repository"
import { CreateQuestsUseCase } from "./create-quest"


let questsRepository: InMemoryQuestsRepository
let sut: CreateQuestsUseCase

describe('Create Quest Use Case', () => {

    beforeEach(()=>{
         questsRepository = new InMemoryQuestsRepository
         sut = new CreateQuestsUseCase(questsRepository)
    })

    it('shoud to be able to create a new quest', async () => {

        const {quest} = await sut.execute({
            title: 'Coragem do fraco',
            description: 'não desista diante das adversidades',
            userId: '04130211'
        })

        expect(quest.id).toEqual(expect.any(String))


    })

})