export class InvalidPasswordError extends Error {
    constructor() {
        super('A senha fornecida deve conter pelo menos 8 caracteres')
    }
}