const getUniqueElementsInTwoArrays = (baseArray, secondaryArray) =>{
    console.log(baseArray, secondaryArray)
    const base = new Set(baseArray)
    const secondary = new Set(secondaryArray)
    return [...base].filter(item => !secondary.has(item))
}
module.exports = getUniqueElementsInTwoArrays