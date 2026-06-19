const { numberFormat } = require("highcharts");
const mongoose = require("mongoose");
const { type } = require("node:os");
const { stringify } = require("node:querystring");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobileNumber: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["HOD", "STAFF"],
      required: true,
    },
    department:{
     type:String,
     required:true
    },
    password: {
      type: String,
      required: true,
    },
    currentLatitude:{
        type: Number
    },
    currentLongitude:{
        type: Number
    },
    areaName: {
        type: String
    },
    lastSeenAt:{
        type:Date
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);