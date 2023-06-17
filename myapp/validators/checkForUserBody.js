const Joi = require("joi")


const validationForBody = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.base": `Firstname should be a string`,
            "string.empty": `Firstname cannot be an empty `,
            "string.min": `Firstname should have a minimum length of {#limit}`,
            "string.max": `Firstname should have a maximum length of {#limit}`,
            "any.required": `Firstname is a required field`
        }),
    lastName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.base": `Lastname should be a string`,
            "string.empty": `Lastname cannot be an empty `,
            "string.min": `Lastname should have a minimum length of {#limit}`,
            "string.max": `Lastname should have a maximum length of {#limit}`,
            "any.required": `Lastname is a required field`
        }),

    phoneNumber: Joi.string()
        .required()
        .pattern(new RegExp("^(\\+98|0)?9\\d{9}$"))
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base":
                "Phone number is not valid. Please enter a valid Iranian mobile phone number"
        }),
    email: Joi.string()
        .required()
        .pattern(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        .messages({
            "string.empty": "Email is required",
            "string.pattern.base": "Email is not valid. Please enter a valid email address"
        }),
    consultationSchedule: Joi.string()
        .pattern(new RegExp("^(0[9]|1[0-5]):[0-5][0-9]$"))
        .messages({
            "object.base": "Consultation schedule should be an object",
            "string.empty": "consultationSchedule is required",
            "string.pattern.base": "Consultation start and end times should be in HH:mm format",
        }),
    reservationDay: Joi.string()
        .required()
        .pattern(new RegExp("^\\d{4}/\\d{2}/\\d{2}$"))
        .messages({
            "string.empty": "Reservation day is required",
            "string.pattern.base": "Invalid reservation day format. Please use the 'YYYY/MM/DD' format",
        }),
    introductionMethod: Joi.string()
        .valid("توسعه فرصت فردا")
        .default("توسعه فرصت فردا")
        .messages({
            "string.base": `Introduction method should be a string`,
            "string.empty": `Introduction method cannot be an empty string`,
            "any.only": `Introduction method should be "توسعه فرصت فردا"`,
        }),
    consultationType: Joi.string()
        .valid("مشاوره تحصیلی", "اوسبیلدینگ")
        .required()
        .messages({
            "string.base": "Consultation type should be a string",
            "string.empty": "Consultation type cannot be an empty string",
            "any.only": "Invalid consultation type. Please choose a valid type",
            "any.required": "Consultation type is a required field"
        })
})

module.exports.validateUser = function (requestBody) {
    return validationForBody.validate(requestBody);
};
