require("dotenv").config();

const mongoose = require("mongoose"); 


const comapany = new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    company_name:{type:String,required:true},
    company_desc:{type:String,default:""},
    company_desc_path:{type:String,default:""},
    postal_address:{type:String,required:true},
    website_url:{type:String,required:true},
    office_contact:{type:String,required:true},
    organization_type:{type:String,required:true},
    indrustry_sec:{type:String,required:true},

    first_point:{
        email:{type:String,required:true},
        full_name:{type:String,required:true},
        alt_email:{type:String,default:""},
        contact:{type:String,required:true},
    },

    second_point:{
        email:{type:String,required:true},
        full_name:{type:String,required:true},
        alt_email:{type:String,default:""},
        contact:{type:String,required:true},
    }
});


module.exports = mongoose.model("Company",comapany);