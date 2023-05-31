const isString = (variable) => {typeof(variable) === 'string' || variable instanceof String}
const isObject = (variable) => {typeof(variable) === 'object'}

/**
 * removes string keys with falsy values
 * @param {Object} obj to be trimmed
 */

const trimObject = (obj) => {
    for (const key in obj){
        if (isString(obj[key]) && (!obj[key].trim())){
            delete obj[key]
        }
        else if (isObject(obj[key])) {
            trimObject(obj[key])
        }
    }
}

module.exports  = {
    trimObject
}