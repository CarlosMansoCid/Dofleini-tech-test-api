require('dotenv').config()

// const whitelist = process.env.ALLOWED_HOSTS.split(' ')
const corsOptions = {
    optionsSuccessStatus: 200,
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1){
//             callback(null, true)
//         } else {
//             console.log(whitelist)
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
origin: '*'
}

module.exports = corsOptions