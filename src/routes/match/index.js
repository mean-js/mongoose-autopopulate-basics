let express = require("express");
let router = express.Router();

router.get("/:id", require("./match.dql"));


module.exports = router;