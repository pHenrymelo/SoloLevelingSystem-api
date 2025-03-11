import type { Prisma, Quest } from "@prisma/client";
import type { QuestsRepository } from "../quests-repository";

export class InMemoryQuestsRepository implements QuestsRepository {

    public items: Quest[] = []

    async create(data: Prisma.QuestUncheckedCreateInput): Promise<Quest> {

        const quest = {
            id: data.id ? data.id : "1",
            title: data.title,
            description: data.description,
            completed: false,
            created_at: new Date(),
            updated_at: new Date(),
            userId: data.userId,
        }

        this.items.push(quest)
        return quest
    }

    async update(id:string, data: any): Promise<Quest | null> {

        let quest = this.items.find(item => item.id === id)

        if(!quest) {
            return null
        }

        quest.title = data.title
        quest.description = data.description
        quest.completed = data.completed
        quest.updated_at = new Date()
        
        return quest
    }

    async findById(id: string) {
        const quest = this.items.find(item => item.id === id)

        if(!quest) {
            return null
        }

        return quest

    }
    async delete(id: string) {
        const index = this.items.findIndex(item => item.id === id)

        if(index === -1) {
            return null
        }

        return this.items.splice(index, 1)

    }

    async list(userId: string, page: number){
        const quests = this.items
        .filter(items => items.userId === userId)
        .slice((page - 1) * 20, page * 20)
        return quests
    }

    async searchMany(query: string, page: number) {
        return this.items.filter((item) => item.title.includes(query))
        .slice((page-1)*20, page*20)
    }
}