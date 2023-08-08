let mongoose = require('mongoose');

class Database {
    #connectionString=`mongodb+srv://phoenixReborn:${process.env.DB_PASSWORD}@cluster0.gywglgt.mongodb.net/?retryWrites=true&w=majority`
  constructor() {
    this._connect()
  }
  
_connect() {
    mongoose.set('strictQuery', false);
     mongoose.connect(this.#connectionString,
       { useNewUrlParser: true, useUnifiedTopology: true})
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error',err)
       })
  }
}

// Exports in Js follows Singleton pattern so, only a single instance of database will be created throughout the app
module.exports = new Database()