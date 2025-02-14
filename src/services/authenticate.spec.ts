import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'

describe('Authenticate Use Case', ()=>{
    it('shoud to be able to authenticate', async () => {

        const usersRepository = new InMemoryUsersRepository
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            username: 'Sung Jin Woo',
            email: 'shadowmonarch@gmail.com',
            password_hash: await hash('04130211', 6)
        })

        const {user} = await sut.execute({
            email: 'shadowmonarch@gmail.com',
            password: '04130211'
        })

        expect(user.id).toEqual(expect.any(String))

    })
    it('shoud not to be able to authenticate whith wrong email', async () => {

        const usersRepository = new InMemoryUsersRepository
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            username: 'Sung Jin Woo',
            email: 'shadowmonarch@gmail.com',
            password_hash: await hash('04130211', 6)
        })

        await expect(()=>
            sut.execute({
                email: 'jinwoo@gmail.com',
                password: '04130211'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)

    })
    it('shoud not to be able to authenticate whith wrong password', async () => {

        const usersRepository = new InMemoryUsersRepository
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            username: 'Sung Jin Woo',
            email: 'shadowmonarch@gmail.com',
            password_hash: await hash('04130211', 6)
        })

        await expect(()=>
            sut.execute({
                email: 'shadowmonarch@gmail.com',
                password: '02110413'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)

    })
})