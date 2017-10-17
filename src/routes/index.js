let express = require("express");
let router = express.Router();

router.use("/", require("./welcome"));
router.use("/user", require("./user"));

module.exports = router;