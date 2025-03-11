import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidPasswordError } from './errors/invalid-password-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {

    beforeEach(()=>{
         usersRepository = new InMemoryUsersRepository
         sut = new RegisterUseCase(usersRepository)
    })

    it('shoud to be able to register a new user', async () => {

        const {user} = await sut.execute({
            username: 'Kaiser',
            email: 'shadowmonarch@gmail.com',
            password: '04130211'
        })

        expect(user.id).toEqual(expect.any(String))


    })

    it('shoud hash user password upon registration', async () => {

        const {user} = await sut.execute({
            username: 'Kaiser',
            email: 'shadowmonarch@gmail.com',
            password: '04130211'
        })

        const isPasswordHashed = await compare('04130211', user.password_hash)

        expect(isPasswordHashed).toBe(true)

    })

    it('shoud not to be able to register with email without @', async () => {
        await expect(() =>
            sut.execute({
                username: 'Kaiser',
                email: 'shadowmonarchgmail.com',
                password: '04130211'
            })
        ).rejects.toBeInstanceOf(InvalidEmailError)
    })
    it('shoud not to be able to register with email without .', async () => {
        await expect(() =>
            sut.execute({
                username: 'Kaiser',
                email: 'shadowmonarchgmail.com',
                password: '04130211'
            })
        ).rejects.toBeInstanceOf(InvalidEmailError)
    })

    it('shoud not to be able to register with smaller than 8 caracters password', async () => {
        await expect(() =>
            sut.execute({
                username: 'Kaiser',
                email: 'shadowmonarch@gmail.com',
                password: '0413021'
            })
        ).rejects.toBeInstanceOf(InvalidPasswordError)
    })

    it('shoud not be able to register multiple users whith same email', async () => {

        const {user} = await sut.execute({
            username: 'Kaiser',
            email: 'shadowmonarch@gmail.com',
            password: '04130211'
        })

        await expect(() =>
            sut.execute({
                username: 'Kaiser',
                email: 'shadowmonarch@gmail.com',
                password: '04130211'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
})