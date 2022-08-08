exports.calculateOffset = (limit,page) =>{
    return parseInt( page -1 )  * limit
}