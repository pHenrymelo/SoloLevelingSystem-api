import { Prisma, Quest } from "@prisma/client";

export interface QuestsRepository {
    create(data: Prisma.QuestUncheckedCreateInput): Promise<Quest>
    findById(id: string): Promise <Quest | null> 
    list(): Promise <Quest[] | null>
    delete(id: string): Promise <Quest | null> 
    update(id: string, data: Prisma.QuestUncheckedUpdateInput): Promise <Quest | null>
}