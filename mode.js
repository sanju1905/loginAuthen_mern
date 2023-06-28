const mongoose=require('mongoose');
const Details=mongoose.Schema(
    {
        name:{
            type:String,
            required:true

        },
        password:
        {
            type:String,
            required:true
        },
        confirmpassword:
        {
            type:String,
            required:true
        },
        email:
        {
            type:String,
            required:true,
            unique:true
        },

    }
)

module.exports=mongoose.model('details',Details);

