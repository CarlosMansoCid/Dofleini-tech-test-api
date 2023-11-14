class Messages{
    static sucessfullMesage(code, payload=null){
        return {
            ok:true,
            code: code,
            payload: payload
        }
    }    

    static errorMessage(code, error, payload=null){
        return {
            ok:false,
            code: code,
            error: error,
            payload: payload
        }
    }
}

module.exports = Messages