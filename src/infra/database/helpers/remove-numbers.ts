export function removeNumbers(arr:[]){
    return arr.filter( (element:string) => {
        const num = parseInt(element.trim())
        return num !== num
    })
}