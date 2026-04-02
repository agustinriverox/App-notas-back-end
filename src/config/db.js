import mongoose from "mongoose"


export const connectDB = async() =>{
    try{
        const dbURI = process.env.MONGODB_URI

        mongoose.connect(dbURI)
        console.log("Mongodb conecto correctamente")
    }catch(error){
        console.error("error al conectar con mongo db",error)
        process.exit(1)
    }
}