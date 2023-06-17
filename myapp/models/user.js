const { Schema, model } = require("mongoose");
const moment = require('moment');

const UsersSchema = new Schema({

  firstName: {
    type: String,
    required: [true, "firstName is required"],
    minlength: [3, "firstName must be equal or more than 3 characters"],
    maxlength: [30, "firstName must be equal or less than 30 characters"],
    trim: true,
    lowercase: true
  },

  lastName: {
    type: String,
    required: [true, "lastName is required"],
    minlength: [3, "lastName must be equal or more than 3 characters"],
    maxlength: [30, "lastName must be equal or less than 30 characters"],
    trim: true,
    lowercase: true
  },

  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^(\+98|0)?9\d{9}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid Iranian phone number!`,
    },
    set: function (v) {
      return `+98${v.replace(/^0/, "")}`;
    }
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email"
    },
    required: [true, "Email required"]
  },

  consultationSchedule: {
    type: Object,
    required: true,
  },

  reservationDay: {
    type: String,
    required: true
  },

  introductionMethod: {
    type: String,
    default: "توسعه فرصت فردا"
  },

  consultationType: {
    type: String,
    enum: ["مشاوره تحصیلی", "اوسبیلدینگ"]
  }
  
});

module.exports = Users = model("user", UsersSchema);