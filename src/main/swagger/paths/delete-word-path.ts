export const deleteWordPath = {
    delete:{
        tags:['Delete Word'],
        summary: 'Route to delete a word from database',
        parameters:[
            {
                in:'path',
                name:'word',
                description: 'word to delete',
                required: true,
                schema:{
                    type: 'string'
                }
            }
        ],
        responses:{
            200:{
                description: 'Success',
                content:{
                    'application/json':{
                        schema:{
                            type: 'string'
                        }
                    }
                }
            },
            400:{
                description: 'Bad Request',
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/schemas/badrequest'
                        }
                    }
                }
            }
        }
    }
}