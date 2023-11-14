const express = require('express')
const dotenv = require('dotenv')
const hpp = require('hpp')
const helmet = require('helmet')
const cors = require('cors')
const corsOptions = require('../config/corsConfig')
const loguer = require('morgan')
const path = require('path')
const entitiesRouter = require('../apps/entities/routes/router')
const rolesRouter = require('../apps/roles/routes/router')

dotenv.config()


class Server{

    static app;
    static port;

    apiPaths = {
        entitiesPaths : '/api/v1/entities',
        rolesPaths: '/api/v1/roles'
    };

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8000;
        this.middlewares()
        this.router()
        this.dbConnect()
        process.env.NODE_ENV = process.env.ENV
    }

    middlewares(){
        //parse
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:false}))

        //security
        this.app.use(hpp())
        this.app.use(helmet())
        this.app.use(cors(corsOptions))

        //loguer
        this.app.use(loguer('dev'))
    }
    router(){
        this.app.use(this.apiPaths.entitiesPaths, entitiesRouter)
        this.app.use(this.apiPaths.rolesPaths, rolesRouter)
    }

    listen(){
        try{
            this.app.listen(this.port, ()=>console.log('server on port ' + this.port))
        }catch(error){
            throw new Error(error)
        }
    }

    dbConnect(){
        require('../db/db')
    }

}

module.exports = Server