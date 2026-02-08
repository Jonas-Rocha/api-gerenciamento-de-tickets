//Lidando com todas as rotas que foram criadas no tickets.js
import { routes } from "../routes/index.js";
import { Database } from "../database/database.js";

//lembrando que quando colocamos o "new" é pra criar uma nova instancia
const database = new Database()

export function routeHandler(request, response) {
    const route = routes.find((route) => {
        /*Neste return eu estou fazendo uma verificação com o find() para encontrar rota que atenda ao criterios do return.
        os critérios são: o metodo da rota pesquisada pelo find() tem que ser o mesmo da requisição, seja POST, GET, DELETE etc...
        E também a pasta(ou path) da rota tem que ser o mesmo da URL do request */
        return route.method === request.method && route.path.test(request.url) 

    
    })

    if(route) {
            return route.controller({ request, response, database})
    }

    return response.writeHead(404).end()
}