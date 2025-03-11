import { InMemoryQuestsRepository } from "@/repositories/in-memory/in-memory-quests-repository"
import { FetchQuestsUseCase } from "./fetch-quests"

let questsRepository: InMemoryQuestsRepository
let sut: FetchQuestsUseCase

describe('Fetch Quests Use Case', () => {

    beforeEach(()=>{
         questsRepository = new InMemoryQuestsRepository
         sut = new FetchQuestsUseCase(questsRepository)
    })

    it('shoud to be able to fetch quests', async () => {

        await questsRepository.create({
            id: "quest1",
            title: 'Coragem do fraco',
            description: 'não desista diante das adversidades',
            userId: '04130211'
        })

        await questsRepository.create({
            id: "quest2",
            title: 'Treinamento de força',
            description: '100 flexões 100 abdominais 100 agachamentos e 10km correndo',
            userId: '04130211'
        })

        const {quests} = await sut.execute({
            userId: "04130211",
            page: 1
        })

        expect(quests[0].id).toEqual(expect.any(String))

        expect(quests).toHaveLength(2)
        expect(quests).toEqual([
            expect.objectContaining({ id: "quest1"}),
            expect.objectContaining({ id: "quest2"})
        ])

    })

    it('shoud to be able to fetch paginated quests', async () => {

        for(let i = 1; i <= 25; i++){
            await questsRepository.create({
                id: `quest${i}`,
                title: 'Coragem do fraco',
                description: 'não desista diante das adversidades',
                userId: '04130211'
            })
        }

        const {quests} = await sut.execute({
            userId: "04130211",
            page: 2,
        })

        expect(quests[0].id).toEqual(expect.any(String))

        expect(quests).toHaveLength(5)
        expect(quests).toEqual([
            expect.objectContaining({ id: "quest21"}),
            expect.objectContaining({ id: "quest22"}),
            expect.objectContaining({ id: "quest23"}),
            expect.objectContaining({ id: "quest24"}),
            expect.objectContaining({ id: "quest25"})
        ])

    })

})