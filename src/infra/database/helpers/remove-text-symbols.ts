export function removeTextSymbols(symbols:string[]){
    return function(arr:[]){
        return arr.map( element => {
            return symbols.reduce((acc, symbol) => {
                return acc.split(symbol).join('')
            }, element)
        })
    }
}