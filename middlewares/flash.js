const flash = (req, res, next) => {
    if (req.session.flashData){
        for (const key in req.session.flashData) {
            res.locals[key] = req.session.flashData[key]
        }
        delete req.session.flashData;
    }
    next();
}

module.exports = flash