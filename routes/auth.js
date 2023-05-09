const router = require("express").Router();
const conn = require("../db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util"); 
const bcrypt = require("bcrypt");
const crypto = require("crypto");


router.post(
  "/login",
  body("email").isEmail().withMessage("please enter a valid email!"),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) character"),
  async (req, res) => {
    try {
     
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      
      const query = util.promisify(conn.query).bind(conn); 
      const user = await query("select * from users where email = ?", [
        req.body.email,
      ]);
      if (user.length == 0) {
        res.status(404).json({
          errors: [
            {
              msg: "email or password not found !",
            },
          ],
        });
      }

      const checkPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (checkPassword) {
        delete user[0].password;
        res.status(200).json(user[0]);
      } else {
        res.status(404).json({
          errors: [
            {
              msg: "email or password not found !",
            },
          ],
        });
      }
    } catch (err) {
      res.status(500).json({ err: err });
    }
  }
);


router.post(
  "/register",
 body("email").isEmail().withMessage("please enter a valid email!"),
 
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) number"),
  body("phone")
  .isLength({min: 3, max: 12 })
  .withMessage("phone should be between (3-12) number "),  
  async (req, res) => {
    try {
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

     
      const query = util.promisify(conn.query).bind(conn); 
      const checkEmailExists = await query(
        "select * from users where email = ?",
        [req.body.email]
      );
      if (checkEmailExists.length > 0) {
        res.status(400).json({
          errors: [
            {
              msg: "email already exists !",
            },
          ],
        });
      }
      const checkPhoneExists = await query(
        "select * from users where phone = ?",
        [req.body.phone]
      );
      if (checkPhoneExists.length > 0) {
        res.status(400).json({
          errors: [
            {
              msg: "phone number already exists !",
            },
          ],
        });
      }

     
      const userData = {
        email: req.body.email,
        phone: req.body.phone,
        password: await bcrypt.hash(req.body.password, 10),
        token: crypto.randomBytes(16).toString("hex"), 
      };

     
      await query("insert into users set ? ", userData);
      delete userData.password;
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json({ err: err });
    }
  }
);

module.exports = router;
