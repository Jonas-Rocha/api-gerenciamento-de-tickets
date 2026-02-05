/*é bom deixar os parâmetros da função dentro de um objeto
para poder usar eles na ordem que quiser, se tirar das chaves,
os parâmetros precisariam seguir a mesma sequência. então é bom
desestruturar a request e a response*/
import { randomUUID } from "node:crypto"

export function create({ request, response, database }) {
    const { equipament, description, user_name } = request.body

    const ticket = {
        id: randomUUID(),
        equipament,
        description,
        user_name,
        status: "open",
        created_at: new Date(),
        updated_at: new Date()
    }

    database.insert("tickets", ticket)

    return response.end(JSON.stringify(ticket))
}