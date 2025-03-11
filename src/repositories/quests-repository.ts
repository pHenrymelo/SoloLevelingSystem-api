import { Prisma, Quest } from "@prisma/client";

export interface QuestsRepository {
    create(data: Prisma.QuestUncheckedCreateInput): Promise<Quest>
    findById(id: string): Promise <Quest | null> 
    list(userId: string, page: number): Promise <Quest[]>
    delete(id: string): Promise <any> 
    update(id: string, data: Prisma.QuestUncheckedUpdateInput): Promise <Quest | null>
    searchMany(query: string, page: number): Promise<Quest[]>
}