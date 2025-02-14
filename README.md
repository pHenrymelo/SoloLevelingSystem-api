# SoloLevelingSstem-api
Uma API para um sistema de gerenciamento de hábitos gamificado.

## RFs (Requisitos Funcionais)

- [x] Deve ser possivel se cadastrar como usuário.
- [x] Deve ser possivel se autenticar como um usuário.
- [ ] Deve ser possivel criar o avatar do usuário.
- [ ] Deve ser possivel visualizar o status do avatar do usuário.
- [ ] Deve ser possivel criar tarefas.
- [ ] Deve ser possivel visualizar as tarefas de um usuário.
- [ ] Deve ser possivel visualizar detalhes de uma tarefa.
- [ ] Deve ser possivel marcar uma tarefa como concluída.
- [ ] Deve ser possivel editar uma tarefa.
- [ ] Deve ser possivel deletar uma tarefa.

## RNs (Regras de Negócio)

- [x] O usuario não deve ser capaz de cadastrar com email duplicado.
- [ ] O usuario so deve ser capaz de criar um avatar.

## RNFs (Requisitos Não-Funcionais)

- [x] A senha deve ser criptografada.
- [x] Os dados da aplicação devem ser persistidos em um banco de dados PostgreSQL.
- [x] O usuario dever ser identificado com um JWT.
