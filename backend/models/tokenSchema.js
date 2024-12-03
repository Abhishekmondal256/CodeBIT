const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const tokenSchema=new Schema({
uId:{
type:Schema.Types.ObjectId,
required:true,
ref:"studentRegister",
unique:true
}
,
token:{type:String,required:true},
ct:{type:Date,default:Date.now(),expires:3600}

});
module.exports=mongoose.model("token",tokenSchema);
