const mongoose= require('mongoose');

const bcrypt= require('bcryptjs');// used to hash passwords..salting 

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImgUrl:{
        type:String,
        default:null
    }
},{timestamps:true} // timestamps is a built in function in mongoose that adds createdAt and updatedAt fields to the schema

)

//saviug pass as hash format before saving to db
UserSchema.pre('save',async function(next){
    if(!this.isModified( 'password')){
    return next(); // if pass ia like not modified then just go to next middleware as   
    }
    this.password=await bcrypt.hash(this.password,10);
    next();
})

//after user tries to login/get info the passwords on both sides are compared
UserSchema.methods.comparePassword=async function(userSidePassword){
    return await bcrypt.compare(userSidePassword,this.password);
}

module.exports=mongoose.model("User",UserSchema)