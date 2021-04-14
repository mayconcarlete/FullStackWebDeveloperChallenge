export const getThreeWordsPath = {
    get:{
        tags:['Search Word'],
        summary: 'Route to get three most closests words by levenshtein algorithm',
        parameters:[
            {
                in:'path',
                name: 'word',
                description:'Word to calculate similarity',
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
                            $ref:'#/schemas/threewords'
                        }
                    }
                }
            },
            400:{
                description: 'Bad Request',
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/schemas/threewordsbadrequest'
                        }
                    }
                }
            }
        }
    }
}