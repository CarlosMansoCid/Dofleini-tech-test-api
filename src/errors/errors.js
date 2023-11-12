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
}
module.exports = Errors