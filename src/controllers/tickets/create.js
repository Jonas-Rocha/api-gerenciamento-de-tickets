/*é bom deixar os parâmetros da função dentro de um objeto
para poder usar eles na ordem que quiser, se tirar das chaves,
os parâmetros precisariam seguir a mesma sequência. então é bom
desestruturar a request e a response*/

export function create({ request, response }) {
    return response.end("Criado com sucesso!")
}