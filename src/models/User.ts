import mongoose, { Schema } from "mongoose";

export interface IUser {
    handle:string,
    name:string,
    email:string,
    password:string
}


// Creamos un schema que es el modelo que tendra en la base de datos
const userSchema = new Schema({

    handle : {
        type:String,
        required:true,
        trim: true,
        lowercase:true,
        unique:true
    },

    name : {
        type:String,
        required:true,
        trim: true, //elimina espacios en blanco por si un usuario crea un nombre con espacios 
    },
    email : {
        type:String,
        required:true,
        trim: true,
        unique: true,
        lowercase:true
    },
    password : {
        type:String,
        required:true,
        trim: true, 
    }

})

const User = mongoose.model<IUser>('User', userSchema)
export default User