const express = require("express");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

const { check } = require("express-validator");

router.get("/", usersControllers.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  usersControllers.signup
);

router.post("/login", usersControllers.login);

module.exports = router;
