const Users = require("../models/user")
const AppError = require('../utils/app-error');
const moment = require('moment');


const userRequestForReserve = require("../utils/userRequestForReserve")
const validationForBody = require("../validators/checkForUserBody");
const sendSMS = require("../services/sendSms")

module.exports.moshaver = async (req, res, next) => {
  try {
    const userRequestForReserve = req.body;
    const { error } = validationForBody.validateUser(userRequestForReserve);


    const start = moment(userRequestForReserve.consultationSchedule, "HH:mm");
    const end = start.clone().add(30, 'minutes');

    const validStartTime = moment('09:00', 'HH:mm');
    const validEndTime = moment('16:00', 'HH:mm');

    if (start.isBefore(validStartTime) || end.isAfter(validEndTime)) {
      return next(
        new AppError(
          400,
          "Invalid consultation schedule. Please choose a time between 09:00 AM and 16:00 PM."
        )
      );
    }

    if (!!error) {
      return next(
          new AppError(
              400,
              error.details[0].message
          )
      )
  }

    const shamsiDateRegex = /^\d{4}\/\d{2}\/\d{2}$/;

    if (shamsiDateRegex.test(userRequestForReserve.reservationDay)) {
      reservationDate = moment(userRequestForReserve.reservationDay, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
    } else {
      reservationDate = userRequestForReserve.reservationDay;
    }

    const today = moment().format('YYYY-MM-DD');
    if (reservationDate < today) {
      return next(
        new AppError(
          400,
          "Invalid reservation date. Please choose a date from tomorrow onwards."
        )
      );
    }


    const existingReservation = await Users.findOne({
      reservationDay: reservationDate,
      'consultationSchedule.start': start.format("HH:mm"),
      'consultationSchedule.end': end.format("HH:mm"),
    });

    if (existingReservation) {
      return next(
        new AppError(
          400,
          "The selected time slot is already booked. Please choose another time slot."
        )
      );
    }

    const newUser = new Users({
      ...userRequestForReserve,
      reservationDay: reservationDate,
      consultationSchedule: {
        start: start.format("HH:mm"),
        end: end.format("HH:mm"),
      },
    });

    await newUser.save();

    
    const phoneNumber = userRequestForReserve.phoneNumber; 
    const message = `Your reservation time slot for ${reservationDate} is ${start.format("HH:mm")} - ${end.format("HH:mm")}.`; // متن پیامک

    
    await sendSMS.sendSMS(phoneNumber, message);

    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    next(new AppError(500, "Reserve failed. Please check your information and try again."));
  }
};