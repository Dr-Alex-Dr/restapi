const router = require('express').Router();
const multer = require("multer");
const path = require("path");
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');
const {addpoint} = require('./controllers/addpointController');
const {removepoint} = require('./controllers/removepointController');

router.post('/register', [
    body('name',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
], register);


router.post('/login',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);

router.get('/getuser',getUser);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({storage: storage});
  

router.post('/addpoint',  upload.any('photo'), addpoint);

router.post('/removepoint',  upload.any('photo'), removepoint);

module.exports = router;