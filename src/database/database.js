/*fs é abreviação de "file sistem" que é para conseguir malipular
os arquivos no vscode, tem funções prontas como "readFile()" e 
também writeFile() para usar.*/
import fs from "node:fs/promises"


/*aqui eu estou básicamente criando uma variável para o caminho do
arquivo do "banco de dados" local: db.json */
const DATABASE_PATH = new URL("db.json", import.meta.url)


export class Database {
    #database = {}
    /*
    constructor():

    Roda automaticamente quando você faz `new Database()`.
    Aqui, a intenção é: ao criar a instância, tentar carregar o conteúdo de `db.json`
    e jogar dentro de `#database`.
    */
    constructor() {
        /*
        * IMPORTANTE:
        * - `fs.readFile(...)` é assíncrono (retorna Promise).
        * - Então o constructor NÃO "para e espera" terminar.
        * - Ele dispara a leitura e depois (quando terminar) atualiza `#database`.
        */
        fs.readFile(DATABASE_PATH, "utf8").then((data) => {

            /*
         * Converte o JSON (texto) para objeto JavaScript.
         *
         * Exemplo:
         * - data = '{"users":[{"id":1,"name":"Jonas"}]}'
         * - JSON.parse(data) vira:
         *   { users: [ { id: 1, name: "Jonas" } ] }
         *
         * E então salvamos isso em `this.#database`.
            */
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
    }

}