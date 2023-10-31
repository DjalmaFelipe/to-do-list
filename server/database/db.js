const mongoose = require('mongoose');

const connectToDb = () => {
    mongoose.connect(
        "mongodb+srv://root:1234@todolist.o6hlpey.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    ).then(() => {
        console.log("mongodb atlas conectado");
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectToDb;