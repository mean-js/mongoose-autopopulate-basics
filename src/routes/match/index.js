let express = require("express");
let router = express.Router();

router.get("/:id", require("./match.dql"));
router.get("/a/b", require("./match.dql"));

module.exports = router;