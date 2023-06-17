const express = require('express');
const router = express.Router();
const usersRouter = require("./userRoute/user-route")


router.use("/users", usersRouter);

module.exports = router;