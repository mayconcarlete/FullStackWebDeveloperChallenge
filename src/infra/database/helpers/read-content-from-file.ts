import fs from 'fs'

export async function readContentFromFile (filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const content = fs.readFileSync(filePath, { encoding: 'utf-8' })
      resolve(content.toString())
    } catch (e) {
      reject(e)
    }
  })
}
