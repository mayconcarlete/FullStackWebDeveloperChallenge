import path from 'path'
import {
    readContentFromFile,
    splitText,
    removeEmptyElements,
    removeTextSymbols,
    joinContent,
    removeNumbers,
    uniqueWords,
    upperCase,
    sortWords
} from './helpers'

const pathFile = process.env.ENV === 'DEV' ? path.join(__dirname, 'corpus', 'hemingway.txt') :'foo'

const symbols = [
    '.', '?', '-', ',', '"', '♪',
    '_', '<i>', '</i>', '\r', '[', ']',
    '(', ')', ':', '*', '#'
]

export async function createFakeConnection():Promise<string[]>{
    return await readContentFromFile(pathFile)
    .then(splitText('\n'))
    .then(removeEmptyElements)
    .then(removeTextSymbols(symbols))
    .then(joinContent)
    .then(splitText(' '))
    .then(removeEmptyElements)
    .then(removeNumbers)
    .then(upperCase)
    .then(uniqueWords)
    .then(sortWords)
}    
