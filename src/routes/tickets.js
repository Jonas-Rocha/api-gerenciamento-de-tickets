import { create } from "../controllers/tickets/create.js";

//Criando as rotas
export const tickets = [
    {
        method: "POST",
        path: "/tickets",
        /*O controller é a função que vai executar alguma coisa quando a rota for chamada*/
        // controller: (request, response) => {
        //     response.end("Criado com sucesso!")
        // }
        controller: create,

    }
]