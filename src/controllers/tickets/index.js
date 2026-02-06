/**
 * CONVENÇÕES PARA NOMEAR
 * 
 * CREATE - criar
 * INDEX - listar
 * UPDATE - atualizar
 * REMOVE - remover
 * SHOW - exibir um único registro
 */

export function index({ request, response, database }) {
    const tickets = database.select("tickets")
    return response.end(JSON.stringify(tickets))
}