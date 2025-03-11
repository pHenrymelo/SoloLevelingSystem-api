export class InvalidEmailError extends Error {
    constructor() {
        super('o email fornecido não é um endereço de email valido')
    }
}