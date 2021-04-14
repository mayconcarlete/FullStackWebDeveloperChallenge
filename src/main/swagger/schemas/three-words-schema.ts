export const threeWordsSchema = {
    type: 'array',
    items:{
        type: 'string'
    }
}

export const threeWordsBadRequestSchema = {
    type: 'object',
    properties:{
        fieldName:{
            type: 'string',
            example:'word'
        },
        message:{
            type: 'string',
            example: 'Type of field word are invalid'
        },
        name:{
            type:'string',
            example: 'TypeVerificationError'
        }
    }
}