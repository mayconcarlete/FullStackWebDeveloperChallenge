import fs from 'fs'
import path from 'path'

export function readFilesFromDirectory(directoryPath:string):Promise<string[]>{
    return new Promise((resolve, reject) => {
        try{
            const files = fs
            .readdirSync(directoryPath)
            .map( file => path.join(directoryPath, file))            
            resolve(files)
        }catch(e){
            reject(e)
        }
    })
}