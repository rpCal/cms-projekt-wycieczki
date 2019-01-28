import "reflect-metadata";
import {createConnection} from "typeorm";


// createConnection({
//     url: process.env.DATABASE_URL,
//     entities: [
//         __dirname + "/entity/*.js"
//     ],
//     synchronize: true,
// }).then(connection => {
//     // here you can start to work with your entities
// }).catch(error => console.log(error));