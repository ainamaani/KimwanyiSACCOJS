const { config } = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();
const cors = require("cors");
const MemberRoutes = require("./routes/MemberRoutes");
const ApprovedMemberRoutes = require("./routes/ApprovedMemberRoutes");
const LoanRoutes = require("./routes/LoanRoutes");
const TransactionRoutes = require("./routes/TransactionRoutes");
const AccountRoutes = require("./routes/AccountRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const DashboardRoutes = require("./routes/DashboardRoutes");
const NotificationRoutes = require("./routes/NotificationRoutes");

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use('uploads', express.static(path.join(__dirname, 'uploads')));
app.use((req,res,next)=>{
    console.log(req.body, req.path , req.method)
    next();
});

//routes
app.use('/api/members',MemberRoutes);
app.use('/api/approvedmembers',ApprovedMemberRoutes);
app.use('/api/loans',LoanRoutes);
app.use('/api/transactions',TransactionRoutes);
app.use('/api/accounts',AccountRoutes);
app.use('/api/dashboard',DashboardRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/notifications', NotificationRoutes);

//connect to mongo db
mongoose.connect(process.env.dbURI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("Connected to SACCO DB",process.env.PORT);
        })
    })
    .catch((error)=>{
        console.log(error);
    })

