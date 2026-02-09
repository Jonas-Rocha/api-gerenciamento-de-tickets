/*fs é abreviação de "file sistem" que é para conseguir malipular
os arquivos no vscode, tem funções prontas como "readFile()" e 
também writeFile() para usar.*/
import fs from "node:fs/promises";

/*aqui eu estou básicamente criando uma variável para o caminho do
arquivo do "banco de dados" local: db.json */
const DATABASE_PATH = new URL("db.json", import.meta.url);

export class Database {
  #database = {};
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
    fs.readFile(DATABASE_PATH, "utf8")
      .then((data) => {
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
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    //return data
    //pelo visto não precisamos retornar os dados pois ja temos acesso a eles no "create.js"
  }

  select(table, filters) {
    let data = this.#database[table] ?? [];

    if (filters) {
      /*
      nesta verificação eu estou basicamente pegando "data" que é o "table"
      dentro do database e fazendo um filtro por para todas as linhas(rows) dentro de "table"
      O método filter() cria um novo array com todos os elementos que passaram no teste implementado pela função fornecida.
      então eu uso o "Object.entries()" para transformar o objto em um array bidimensional
      e tranformo a chave(key) em lowerCase para fazer a verificação com o includes() também lowerCase se 
      existe o valor buscado.

      se não existe ele vai simplesmente retornar um array vazio como na declaração da variável "data" logo acima.


      */
      data = data.filter((row) => {
        return Object.entries(filters).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
        /*
        o metodo some() testa se ao menos um dos elementos no array passa no teste
        implementado pela função atribuida e retorna um valor true ou false.
        */
      });
    }

    return data;
  }
}
