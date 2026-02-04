//Lidando com todas as rotas que foram criadas no tickets.js
import { routes } from "../routes/index.js";

export function routeHandler(request, response) {
    const route = routes.find((route) => {
        /*Neste return eu estou fazendo uma verificação com o find() para encontrar rota que atenda ao criterios do return.
        os critérios são: o metodo da rota pesquisada pelo find() tem que ser o mesmo da requisição, seja POST, GET, DELETE etc...
        E também a pasta(ou path) da rota tem que ser o mesmo da URL do request */
        return route.method === request.method && route.path === request.url

    
    })

    if(route) {
            return route.controller({ request, response })
    }

    return response.writeHead(404).end()
}