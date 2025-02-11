export class InvalidCredentialsError extends Error {
    constructor() {
        super('as credenciais informadas são invalidas')
    }
}