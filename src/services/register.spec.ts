import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {

    it('shoud to be able to register a new user', async () => {

        const usersRepository = new InMemoryUsersRepository
        const registerUseCase = new RegisterUseCase(usersRepository)

        const {user} = await registerUseCase.execute({
            username: 'Sung Jin Woo',
            email: 'shadowmonarch@gmail.com',
            password: '04130211'
        })

        expect(user.id).toEqual(expect.any(String))


    })
    it('shoud hash user password upon registration', async () => {

        const usersRepository = new InMemoryUsersRepository
        const registerUseCase = new RegisterUseCase(usersRepository)

        const {user} = await registerUseCase.execute({
            username: 'Sung Jin Woo',
            email: 'shadowmonarch@gmail.com',
            password: '04130211'
        })

        const isPasswordHashed = await compare('04130211', user.password_hash)

        expect(isPasswordHashed).toBe(true)

    })

    it('shoud not be able to register multiple users whith same email', async () => {

        const usersRepository = new InMemoryUsersRepository
        const registerUseCase = new RegisterUseCase(usersRepository)

        const {user} = await registerUseCase.execute({
            username: 'Sung Jin Woo',
            email: 'shadowmonarch@gmail.com',
            password: '04130211'
        })

        expect(() =>
            registerUseCase.execute({
                username: 'Sung Jin Woo',
                email: 'shadowmonarch@gmail.com',
                password: '04130211'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
})