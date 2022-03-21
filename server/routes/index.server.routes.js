let express = require("express");
let router = express.Router();

let indexController = require("../controllers/index.server.controllers");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET home page. */
router.get("/", indexController.index);

module.exports = router;
