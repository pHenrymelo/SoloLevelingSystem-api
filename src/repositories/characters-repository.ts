import { Prisma, Character} from "@prisma/client"

export interface CharactersRepository {
    create(data: Prisma.UserCreateInput): Promise<Character>
    findByEmail(email: string): Promise <Character | null>
    findById(id: string): Promise <Character | null> 
}