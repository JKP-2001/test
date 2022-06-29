require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Company = require("../Models/Company");
const bcrypt = require("bcrypt");    // Package use to hash a password string.
const saltRounds = 10;    // SaltRounds for our password to hash.

const multer = require("multer");   // Package used to deal with files.
const fs = require("fs");       // Help to manage, access and edit file in a folder.



const company_storage = multer.diskStorage({        // function for a image storage
    destination: function (req, file, cb) {     // setting destination
        cb(null, "./uploads/company")
    },
    filename: function (req, file, cb) {        // setting specification of file
        var today = new Date();
        var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var x = time + "-" + date;
        cb(null, x + "-" + file.originalname);

    }
})




const company_upload = multer({    //function to upload image in the destination
    storage: company_storage, limits: { fileSize: 1024 * 1024 * 10 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .pdf format allowed!'));
        }
    }
}).single("Company_Desc");




router.post("/register", async (req, res) => {

    var company_desc_path = "";
    var company_desc = "";


    company_upload(req, res, async function (err) {
        const email = req.body.email;
        const isComp = await Company.findOne({ email: email });
        if (isComp) {
            res.status(400).send("Company Already Registerd.");
        }
        else {
            img_path = "";
            if (req.file === undefined && err) {              // Checking if there is a file in the input
                res.status(403).send(err.message);
            }

            else if (req.file === undefined) {
                company_desc = req.body.company_desc;
            }

            else {
                console.log(req.file);
                company_desc_path = req.file.path;
            }



            const first_point = {
                email: req.body.F_email,
                full_name: req.body.F_name,
                alt_email: req.body.F_altemail,
                contact: req.body.F_contact,
            }

            const second_point = {
                email: req.body.S_email,
                full_name: req.body.S_name,
                alt_email: req.body.S_altemail,
                contact: req.body.S_contact,
            }


            bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {

                if (err) {
                    res.status(400).send(err);
                }
                else {
                    var url = "";
                    var path="";
                    if (req.file !== undefined) {
                        url = "http://localhost:5000/uploads/company/" + req.file.filename;
                        path = "/uploads/company/" + req.file.filename;
                    }
                    const item = await Company.create({           // Create Item and save item in the Database
                        email: req.body.email,
                        password: hash,
                        company_name: req.body.company_name,
                        postal_address: req.body.postal_address,
                        website_url: req.body.website_url,
                        office_contact: req.body.office_contact,
                        organization_type: req.body.organization_type,
                        indrustry_sec: req.body.indrustry_sec,
                        company_desc: company_desc,
                        company_desc_path: path,
                        first_point: first_point,
                        second_point: second_point
                    });

                    res.status(200).json({ "msg": "success", "url": url });
                }
            })
            // Everything went fine.
        }
    })
});


router.put("/update-profile/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const company = await Company.findOne({ _id: id });
        if (company) {
            company_upload(req, res, async function (err) {

                var company_desc_path = company.company_desc_path;
                var company_desc = company.company_desc;
                if (req.file === undefined && err) {              // Checking if there is a file in the input
                    res.status(403).send(err.message);
                }

                else if (req.file === undefined) {
                    company_desc = req.body.company_desc;
                    company_desc_path = "";
                }

                else {
                    console.log(req.file);
                    company_desc = "";
                    company_desc_path = req.file.path;
                    if (company.company_desc_path !== "") {
                        fs.unlinkSync(company.company_desc_path);
                    }

                }


                var url = "";
                var path = "";
                if (req.file !== undefined) {
                    url = "http://localhost:5000/uploads/company/" + req.file.filename;
                    path = "/uploads/company/" + req.file.filename;
                }

                const first_point = {
                    email: req.body.F_email,
                    full_name: req.body.F_name,
                    alt_email: req.body.F_altemail,
                    contact: req.body.F_contact,
                }

                const second_point = {
                    email: req.body.S_email,
                    full_name: req.body.S_name,
                    alt_email: req.body.S_altemail,
                    contact: req.body.S_contact,
                }

                const item = await Company.findOneAndUpdate(company._id, {           // Create Item and save item in the Database
                    company_name: req.body.company_name,
                    postal_address: req.body.postal_address,
                    website_url: req.body.website_url,
                    office_contact: req.body.office_contact,
                    organization_type: req.body.organization_type,
                    indrustry_sec: req.body.indrustry_sec,
                    company_desc: company_desc,
                    company_desc_path: path,
                    first_point: first_point,
                    second_point: second_point
                });


                res.status(200).json({ "msg": "success", "url": url });
                // Everything went fine.
            })
        }
        else {
            res.status(404).send("Comapny Not Found");
        }
    } catch (err) {
        res.status(400).send(err);
    }
});


router.get("/get-company/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const company = await Company.findById(id).select("-password");
        if (company) {
            res.status(200).send(company);
        }
        else {
            res.status(404).send("Company Not Found");
        }

    } catch (err) {
        res.status(400).send(err);
    }
})



module.exports = router;