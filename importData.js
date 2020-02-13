const Datastore = require('nedb-promise')
const users = new Datastore({filename:'users.db', autoload:true})
const json = require('./users.json')
users.insert(json.results)