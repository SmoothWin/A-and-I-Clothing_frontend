export function returnNumberDecimals(string, multiply = 1){
    let number = parseInt(string)*multiply
    number = number.toString()
    return number.substring(0, number.length - 2)+"."+number.substring(number.length - 2)
}