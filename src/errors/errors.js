class Errors  {
    static genericServerError = {
        errorCode: 5100,
        message: 'error en el servidor'
    }
    static infoMissedError = {
        errorCode: 4101,
        message: 'falta información en la petición'
    }
    static badInfo = {
        errorCode: 4102,
        message: 'los datos de la petición no son correctos'
    }
    static infoAllreadyExistInDb = {
        errorCode: 4103,
        message: 'la información ya existe'
    }
    static infoDontExistInDb = {
        errorCode: 4104,
        message: 'la información no existe'
    }
}
module.exports = Errors