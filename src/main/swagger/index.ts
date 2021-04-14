import {threeWordsSchema, threeWordsBadRequestSchema} from '@main/swagger/schemas/three-words-schema'
import { getThreeWordsPath } from '@main/swagger/paths/get-three-words-path'
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
        '/get-three-words/{word}': getThreeWordsPath
    },
    schemas:{
        threewords: threeWordsSchema,
        threewordsbadrequest: threeWordsBadRequestSchema
    }
}