let express = require("express");
let router = express.Router();

router.get("/", require("./user.dql"));
router.post("/", require("./user.dml"));
router.put("/", require("./user.dml"));

module.exports = router;