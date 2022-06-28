require("dotenv").config();

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    webEmail:{type:String,required:true},
    rollNumber:{type:Number,required:true},
    name:{type:String,required:true},
    gender:{type:String,required:true},
    DOB:{type:String,required:true},
    nationality:{type:String,required:true},
    hostel:{type:String,required:true},
    roomNo:{type:String,required:true},
    altEmail:{type:String},
    mobile:{type:Number,required:true},
    homeMobile:{type:Number,required:true},
    LinkedIn_pub_url:{type:String,default:""},
    disablility:{type:Boolean,required:true,default:false},

    address:{
        perm_Add_Lane1:{type:String,required:true},
        perm_Add_Lane2:{type:String,default:""},
        perm_Add_Lane3:{type:String,default:""},
        pinCode:{type:Number,required:true}
    },

    schooling:{
        percentage_X:{type:Number,required:true},
        X_pass_year:{type:String,required:true},
        X_Exam_Board:{type:String,required:true},
        X_Exam_Medium:{type:String,required:true},
        percentage_XII:{type:Number,required:true},
        XII_pass_year:{type:String,required:true},
        XII_Exam_Board:{type:String,required:true},
        XII_Exam_Medium:{type:String,required:true},
        gap:{type:Boolean,required:true},
        reason_gap:{type:String,default:""},
    },

    academic:{
        major_year_addmission:{type:String,required:true},
        major_department:{type:String,required:true},
        major_program:{type:String,required:true},
        major_discipline:{type:String,required:true},
        minor_academic_year:{type:String,required:true},
        minor_department:{type:String,required:true},
        minor_program:{type:String,required:true},
        minor_discipline:{type:String,required:true},
        active_backlog:{type:Boolean,required:true},
        UG_Degree_CPI:{type:Number,required:true},
    },

    entrance_exam:{
        examGiven:{type:String,required:true},
        rank:{type:Number,required:true},
        category:{type:String,defaul:"General"},
    },

    grades:{
        CPI:{type:Number,required:true},
        SPI:{
            firstSem:{type:Number,defaul:0},
            secondSem:{type:Number,defaul:0},
            thirdSem:{type:Number,defaul:0},
            fourthSem:{type:Number,defaul:0},
            fifthSem:{type:Number,defaul:0},
            sixthSem:{type:Number,defaul:0},
            seventSem:{type:Number,defaul:0},
            eigthSem:{type:Number,defaul:0},
        }
    },

    CVs:{
        CV_1:{type:String,default:""},
        CV_2:{type:String,default:""},
        CV_3:{type:String,default:""}
    },

    app_jobs:[{type:mongoose.Schema.Types.ObjectId,default:[]}],
    isPPO:{type:Boolean,defaul:false},
    isPlaced:{type:Boolean,default:false},
    isVerified:{type:Boolean,default:false,required:true}
})



module.exports = mongoose.model("Student",studentSchema);