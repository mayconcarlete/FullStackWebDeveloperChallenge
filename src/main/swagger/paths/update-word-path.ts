export const updateWordPath = {
  post: {
    tags: ['Insert Word'],
    summary: 'Route to insert word in database',
    parameters: [
      {
        in: 'path',
        name: 'word',
        description: 'word to add in database',
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'string'
            }
          }
        }
      },
      400: {
        description: 'Bad Request',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/badrequest'
            }
          }
        }
      }
    }
  }
}
