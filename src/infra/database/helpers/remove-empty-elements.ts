export function removeEmptyElements(arr:any){
    return arr.filter( (element:string) => element.trim())
}