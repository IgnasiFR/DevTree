import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    handle:string,
    name:string,
    email:string,
    password:string
    description: string
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
        default: '',
        required:true,
        trim: true, 
    },

    description : {
        type: String,
        default: '',
    }

})

const User = mongoose.model<IUser>('User', userSchema)
export default User