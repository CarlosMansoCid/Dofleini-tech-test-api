class Errors  {
    static genericServerError = {
        errorCode: 5100,
        message: 'server error'
    }
    static infoMissedError = {
        errorCode: 4101,
        message: 'info missed in the petition'
    }
    static badInfo = {
        errorCode: 4102,
        message: 'bad info format in the petition'
    }
    static infoAllreadyExistInDb = {
        errorCode: 4103,
        message: 'info allready exist in the db'
    }
    static infoDontExistInDb = {
        errorCode: 4104,
        message: 'info dont exist in the db'
    }
}
module.exports = Errors