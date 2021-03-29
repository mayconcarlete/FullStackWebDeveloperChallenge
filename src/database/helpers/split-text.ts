export function splitText(symbol:string){
    return function(text:string){
        return text.split(symbol)
    }
}