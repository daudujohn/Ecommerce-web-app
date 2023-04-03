const joiFormatter = (rawError) => {
    errors = {}
    const details = rawError.details
    details.map((d) => {
        errors[d.path] = [d.message]
    })
    return errors
}

const mongooseFormatter = (rawError) => {
    errors = {}
    for (const key in rawError['errors']){
        errors[key] = [rawError['errors'][key]['message']]
    }
    return errors
}

exports.joiFormatter = joiFormatter
exports.mongooseFormatter = mongooseFormatter