require("dotenv").config();

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../Models/Student");



router.post("/createprofile", async (req, res) => {
    try {
        const roll = req.body.rollNumber;

        const stud = await Student.findOne({ rollNumber: roll });
        

        if (stud) {
            res.status(403).send("Student Profile Already Existed");
        }
        else {
            const address = {
                perm_Add_Lane1: req.body.Lane1,
                pinCode: req.body.pinCode
            }

            const schooling = {
                percentage_X: req.body.perX,
                X_pass_year: req.body.X_pass_year,
                X_Exam_Board: req.body.X_Exam_Board,
                X_Exam_Medium: req.body.X_Exam_Medium,
                percentage_XII: req.body.percentage_XII,
                XII_pass_year: req.body.XII_pass_year,
                XII_Exam_Board: req.body.XII_Exam_Board,
                XII_Exam_Medium: req.body.XII_Exam_Medium,
                gap: req.body.gap,
                reason_gap: req.body.reason_gap,
            }

            const academic = {
                major_year_addmission: req.body.major_year,
                major_department: req.body.maj_dept,
                major_program: req.body.major_program,
                major_discipline: req.body.major_discipline,
                minor_academic_year: req.body.minor_academic_year,
                minor_department: req.body.minor_department,
                minor_program: req.body.minor_program,
                minor_discipline: req.body.minor_discipline,
                active_backlog: req.body.active_backlog,
                UG_Degree_CPI: req.body.UG_Degree_CPI,
            }

            const entrance_exam = {
                examGiven: req.body.exam,
                rank: req.body.rank,
            }

            const grades = {
                CPI: req.body.CPI,
                SPI: {
                    firstSem: req.body.firstSem,
                    secondSem: req.body.secondSem,
                    thirdSem: req.body.thirdSem,
                    fourthSem: req.body.fourthSem
                }
            }




            const studProf = await Student.create({
                webEmail: req.body.email,
                rollNumber: req.body.rollNumber,
                name: req.body.name,
                gender: req.body.gender,
                DOB: req.body.DOB,
                nationality: req.body.nationality,
                hostel: req.body.hostel,
                roomNo: req.body.roomNo,
                altEmail: req.body.altEmail,
                mobile: req.body.mobile,
                homeMobile: req.body.homeMobile,
                address: address,
                schooling: schooling,
                academic: academic,
                entrance_exam: entrance_exam,
                grades: grades,
            })

            res.status(200).send("Success");
        }



    } catch (err) {
        res.status(400).send(err);
    }
});



router.get("/getstudent/:roll", async (req,res)=>{
    const rollNumber = req.params.roll;
    try{
        const stud = await Student.findOne({rollNumber:rollNumber});
        if(stud){
            res.status(200).send(stud);
        }
        else{
            res.status(404).send("Student Doesn't Existed.")
        }
    }catch(err){
        res.status(403).send(err);
    }
});


router.patch("/editStudent/:roll", async (req,res)=>{
    const rollNumber = req.params.roll;
    const student = await Student.findOne({rollNumber:rollNumber});
    
    

    try{

        let academic = {};
        let entrance_exam = {};
        let grades = {};
        let schooling = {};

        const address = {
            perm_Add_Lane1: req.body.Lane1,
            perm_Add_Lane2: req.body.Lane2,
            perm_Add_Lane3: req.body.Lane3,
            pinCode: req.body.pinCode,
        }

        
        console.log(student.isVerified);

        if(student.isVerified === false){
            schooling = {
                percentage_X: req.body.perX,
                X_pass_year: req.body.X_pass_year,
                X_Exam_Board: req.body.X_Exam_Board,
                X_Exam_Medium: req.body.X_Exam_Medium,
                percentage_XII: req.body.percentage_XII,
                XII_pass_year: req.body.XII_pass_year,
                XII_Exam_Board: req.body.XII_Exam_Board,
                XII_Exam_Medium: req.body.XII_Exam_Medium,
                gap: req.body.gap,
                reason_gap: req.body.reason_gap,
            }

            academic = {
                major_year_addmission: req.body.major_year,
                major_department: req.body.maj_dept,
                major_program: req.body.major_program,
                major_discipline: req.body.major_discipline,
                minor_academic_year: req.body.minor_academic_year,
                minor_department: req.body.minor_department,
                minor_program: req.body.minor_program,
                minor_discipline: req.body.minor_discipline,
                active_backlog: req.body.active_backlog,
                UG_Degree_CPI: req.body.UG_Degree_CPI,
            }

            entrance_exam = {
                examGiven: req.body.exam,
                rank: req.body.rank,
            }

            grades = {
                CPI: req.body.CPI,
                SPI: {
                    firstSem: req.body.firstSem,
                    secondSem: req.body.secondSem,
                    thirdSem: req.body.thirdSem,
                    fourthSem: req.body.fourthSem
                }
            }
        }
        else{
            schooling = student.schooling;
            academic = student.academic;
            entrance_exam = student.entrance_exam;
            grades = student.grades;
        }



        const update = await Student.findByIdAndUpdate(student._id,{
            nationality:req.body.nationality,
            hostel: req.body.hostel,
            roomNo: req.body.roomNo,
            altEmail: req.body.altEmail,
            mobile: req.body.mobile,
            homeMobile: req.body.homeMobile,
            LinkedIn_pub_url: req.body.LinkedIn_pub_url,
            disablility: req.body.disablility,
            address: address,
            schooling: schooling,
            academic:academic,
            entrance_exam: entrance_exam,
            grades: grades,
        })

        res.status(200).send("Updation Successfull");
    }catch(err){
        res.status(400).send(err);
    }

});






module.exports = router;