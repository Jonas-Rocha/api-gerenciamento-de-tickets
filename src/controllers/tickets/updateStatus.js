export function updateStatus({ request, response, database }) {
  const { id } = request.params;
  const { solution } = request.body;

  database.update("tickets", id, { status: "closed", solution });

  response.end();
}
