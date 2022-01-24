const mongoose = require('mongoose')
const connectDB = async() => {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log(`MongoDB Connected... ${connect.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB