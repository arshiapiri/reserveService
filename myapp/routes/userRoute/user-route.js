const express = require('express');
const router = express.Router();
const controller = require("../../controllers/user-controller")


router.post("/moshaver" , controller.moshaver);

module.exports = router;