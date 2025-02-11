export class UserAlreadyExistsError extends Error {
    constructor() {
        super('o email informado ja está cadastrado no sistema')
    }
}