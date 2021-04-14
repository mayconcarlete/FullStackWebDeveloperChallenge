import {threeWordsSchema, badRequest} from '@main/swagger/schemas'
import { getThreeWordsPath,updateWordPath, deleteWordPath } from '@main/swagger/paths'
export default {
    openapi: '3.0.0',
    info:{
        title: 'Mistplay FullStack Challenge',
        description: 'Api maded to make search, insert and post in a given database',
        version: '1.0.0'
    },
    servers:[
        {
            url:'/'
        }
    ],
    tags:[
        {
            name:'Search Word'
        },
        {
            name:'Insert Word'
        },
        {
            name: 'Delete Word'
        }
    ],
    paths:{
        '/get-three-words/{word}': getThreeWordsPath,
        '/update-word/{word}': updateWordPath,
        '/delete-word/{word}': deleteWordPath
    },
    schemas:{
        threewords: threeWordsSchema,
        badrequest: badRequest
    }
}