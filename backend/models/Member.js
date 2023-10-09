const mongoose = require("mongoose");
const MemberSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required: [true,'First name is required.']
    },
    lastName :{
        type:String,
        required:[true,'Last name is required.']
    },
    gender :{
        type:String,
        required:[true,'Gender is required'],
        enum: {
            values: ["Male","Female","Other"],
            message: "Gender must be one of: Male, Female, Other."
        }
    },
    dateOfBirth :{
        type:Date,
        required:[true,'Date of birth is required.'],
        validate: {
            validator: function (value) {
                // Define the minimum allowed year 
                const minimumYear = 2005;
                
                // Extract the year from the date of birth
                const birthYear = value.getFullYear();
                
                // Check if the birth year is after the minimum year
                return birthYear <= minimumYear;
            },
            message: 'Applicants below 18 years are not eligible for membership'
        }
    },
    residentialAddress:{
        type:String,
        required:[true,'Residential Address is required.']
    },
    email:{
        type:String,
        required:[true,'Email Address is required.'],
        validate: {
            validator: async function (value) {
                // Check if the email format is valid
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if (!emailRegex.test(value)) {
                    throw new Error('Invalid email format. Please provide a valid email address.');
                }

                // Check if the email is already in use
                const existingMember = await this.constructor.findOne({ email: value });
                if (existingMember) {
                    throw new Error('Email already exists');
                }  
            }
        }
    },
    phoneNumber:{
        type:String,
        required:[true,'Phone number is required'],
        validate: {
            validator: async function (value) {
                // Check if the phone number has at least 10 digits
                if(value.length < 10){
                    throw new Error('Phone number must be not less than 10 digits');
                }
                //check for uniqueness
                const existingPhoneNumber = await this.constructor.findOne({ phoneNumber:value });
                if(existingPhoneNumber){
                    throw new Error('This Phone number already exists');
                }
            }
        }
    },
    employmentStatus:{
        type:String,
        required:[true,'Employment status is required'],
        enum:{
            values: ["Employed","Self Employed","Unemployed"],
            message: "Employment status has to be one of: Employed,Self Employed,Unemployed"
        }
    },
    currentOccupation:{
        type:String,
    },
    employerName:{
        type:String
    },
    employerEmail:{
        type:String,
        validate: {
            validator: function (value) {
                // Check if the email format is valid
                if(value !== null){
                    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                    return emailRegex.test(value);
                }  
                
            },
            message: 'Invalid Employer email format. Please provide a valid email address.'
        }
    },
    employerPhoneNumber:{
        type:String,
        validate: {
            validator: function (value) {
                // Check if the phone number has at least 10 digits
                if(value !== null ){
                    return value.length >= 10;
                } 
                
            },
            message: 'Employer Phone number must have at least 10 digits.'
        }
    },
    nextOfKin:{
        type:String,
        required:[true,'Next of Kin is required.']
    },
    nextOfKinEmail:{
        type:String,
        required:[true,'Next of Kin Email is required.'],
        validate: {
            validator: function (value) {
                // Check if the email format is valid
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return emailRegex.test(value);
            },
            message: 'Invalid Next of kin email format. Please provide a valid email address.'
        }
    },
    nextOfKinPhoneNumber:{
        type:String,
        required:[true,'Next of Kin phone number is required.'],
        validate: {
            validator: function (value) {
                // Check if the phone number has at least 10 digits
                return value.length >= 10;
            },
            message: 'Next of kin phone number must have at least 10 digits.'
        }
    },
    membershipStatus:{
        type:String,
        enum: {
            values: ["Approved","Not Approved","Declined"],
            message: "Membership status has to be one of: Approved, Not Approved,Declined"
        },
        default: "Not Approved"
    }
    
},{timestamps:true})


module.exports = mongoose.model('Member',MemberSchema);