import { InMemoryQuestsRepository } from "@/repositories/in-memory/in-memory-quests-repository"
import { UpdateQuestsUseCase } from "./update-quest"


let questsRepository: InMemoryQuestsRepository
let sut: UpdateQuestsUseCase

describe('Update Quest Use Case', () => {

    beforeEach(()=>{
         questsRepository = new InMemoryQuestsRepository
         sut = new UpdateQuestsUseCase(questsRepository)
    })

    it('shoud to be able to update a quest data', async () => {

        const createdQuest = await questsRepository.create({
            title: 'Coragem do fraco',
            description: 'não desista diante das adversidades',
            userId: '04130211'
        })   

        const {quest} = await sut.execute({
            questId: createdQuest.id,
            title: 'treinamnto de força',
            description: '100 flexão, 100 abdominal, 100 agachamento + 10km',
            completed: true
        })

        expect(quest?.title).toEqual('treinamnto de força')
        expect(quest?.description).toEqual('100 flexão, 100 abdominal, 100 agachamento + 10km')
        expect(quest?.completed).toBe(true)


    })

})