import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetStatusUseCase } from './get-user-status'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetStatusUseCase


describe('status tests', () => {

    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository
        sut = new GetStatusUseCase(usersRepository)
        })

    it('shoud be able to get a user status', async () => {

        const CreatedUser = await usersRepository.create({
            username: 'Sung Jin Woo',
            email: 'shadowmonarch@gmail.com',
            password_hash: await hash('04130211', 6)
        })

        const {user} = await sut.execute({
            userId: CreatedUser.id
        })

        expect(user.username).toEqual('Sung Jin Woo')

    })
    it('shoud not be able to get a inexistent user status', async () => {

        expect(()=>
            sut.execute({
                userId: 'not-existing-id'
            })).rejects.toBeInstanceOf(ResourceNotFoundError)

    })
})
