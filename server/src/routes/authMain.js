
// import User from '../models/user.model';
// import { body, validationResult } from 'express-validator';
// import bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';
// import fetchuser from '../middleware/fetchUser';
// const JWT_SECRET = 'securejwtrandomstring'; 

const router = require("express").Router();

const authController = require("../controllers/auth.contollers.js");

router.post("/login", authController.login);

router.post("/register", authController.register, authController.sendOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/send-otp", authController.sendOTP);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;


// router.post('/register', [
//     body('name', 'Enter a valid name').isLength({ min: 3 }),
//     body('email', 'Enter a valid email').isEmail(),
//     body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
// ],  async (req: express.Request, res: express.Response) => {
//     let success = false;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array()});
//     }
//     try {
//       const salt = await bcrypt.genSalt(10);
//       const securePassword = await bcrypt.hash(req.body.password, salt);
//       var user = await User.create({
//         name: req.body.name,
//         password: securePassword,
//         email: req.body.email,
//         wantnotification: req.body.notify
//       });
//       const data = {
//         user: {
//           id: user.id
//         }
//       }
//       const authtoken = jwt.sign(data, JWT_SECRET);
//       success = true;
//       res.json({ success, authtoken })
  
//     } catch (error: any) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
// })
  
  
// router.post('/login', [
//     body('email', 'Enter a valid email').isEmail(),
//     body('password', 'Password cannot be blank').exists(),
// ],  async (req: express.Request, res: express.Response) => {
//     let success = false;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success, errors: errors.array() });
//     }
//     const { email, password } = req.body;
//     try {
//       let user = await User.findOne({ email });
//       if (!user) {
//         success = false
//         return res.status(400).json({ error: "Please try to login with correct credentials" });
//       }
//       const passwordCompare = await bcrypt.compare(password, user.password);
//       if (!passwordCompare) {
//         success = false
//         return res.status(400).json({ success, error: "Please try to login with correct credentials" });
//       }
//       const data = {
//         user: {
//           id: user.id
//         }
//       }
//       const authtoken = jwt.sign(data, JWT_SECRET);
//       success = true;
//       res.json({ success, authtoken })
  
//     } catch (error: any) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
  
  
// });
  
// router.post('/getuser', fetchuser,  async (req: any, res: express.Response) => {
//     try {
//       const userId = req.user.id;
//       const user = await User.findById(userId).select("-password")
//       res.send(user)
//     } catch (error: any) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
// })
  
// router.post('/getuserbyemail', [body('email', 'Enter a valid email').isEmail()],  async (req: express.Request, res:express.Response) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array()});
//     }
//     try {
//       const user = await User.find({email:req.body.email});
//       let success = false;
//       if (user.length !== 0) {
//         success = true;
//       }
//       return res.json({ success: success });
//     } catch (error: any) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
// })

// export default router;