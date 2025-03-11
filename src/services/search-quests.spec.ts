import { InMemoryQuestsRepository } from "@/repositories/in-memory/in-memory-quests-repository"
import { SearchQuestsUseCase } from "./search-quest"
import { title } from "process"

let questsRepository: InMemoryQuestsRepository
let sut: SearchQuestsUseCase

describe('Search Quests Use Case', () => {

    beforeEach(()=>{
         questsRepository = new InMemoryQuestsRepository
         sut = new SearchQuestsUseCase(questsRepository)
    })

    it('shoud to be able to search a quest', async () => {

        await questsRepository.create({
            id: "quest137",
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
            query: "Coragem",
            page: 1,
        })

        expect(quests).toHaveLength(1)
        expect(quests).toEqual([
            expect.objectContaining({ id: "quest137"})
        ])

    })

    it('shoud to be able to search a quest with similarities', async () => {

        await questsRepository.create({
            id: "quest137",
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

        await questsRepository.create({
            id: "quest3",
            title: 'Treinamento de agilidade',
            description: 'pratique shadow boxe por 30 min',
            userId: '04130211'
        })

        const {quests} = await sut.execute({
            query: "Treinamento",
            page: 1,
        })

        expect(quests).toHaveLength(2)
        expect(quests).toEqual([
            expect.objectContaining({ title: "Treinamento de força"}),
            expect.objectContaining({ title: "Treinamento de agilidade"})
        ])

    })

    it('shoud to be able to paginated quests search', async () => {

        for(let i = 1; i <= 25; i++){
            await questsRepository.create({
                id: `quest ${i} `,
                title: `Coragem do fraco ${i}`,
                description: 'não desista diante das adversidades',
                userId: '04130211'
            })
        }

        const {quests} = await sut.execute({
            query: "fraco",
            page: 2,
        })

        expect(quests[0].id).toEqual(expect.any(String))

        expect(quests).toHaveLength(5)
        expect(quests).toEqual([
            expect.objectContaining({ title: "Coragem do fraco 21"}),
            expect.objectContaining({ title: "Coragem do fraco 22"}),
            expect.objectContaining({ title: "Coragem do fraco 23"}),
            expect.objectContaining({ title: "Coragem do fraco 24"}),
            expect.objectContaining({ title: "Coragem do fraco 25"})
        ])

    })

})