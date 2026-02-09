import { create } from "../controllers/tickets/create.js";
import { index } from "../controllers/tickets/index.js";
import { update } from "../controllers/tickets/update.js";

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
  },

  {
    method: "GET",
    path: "/tickets",
    controller: index,
  },

  {
    method: "PUT",
    path: "/tickets/:id",
    controller: update,
  },
];
