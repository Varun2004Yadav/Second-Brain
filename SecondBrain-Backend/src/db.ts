import mongoose, { Schema , Model, model} from "mongoose";

const objectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: {type:String, unique: true,},
    password: String,
});
export const userModel = mongoose.model("users", userSchema);


const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'users', required:true},
})
export const  ContentModel = model("Content", ContentSchema);


const LinkSchema = new Schema({
    hash: String,
    userId: {type:mongoose.Types.ObjectId, ref:'users',required:true,
    unique: true},
})

export const LinkModel = mongoose.model('Links',LinkSchema);


// module.exports={
//     userModel
// }
