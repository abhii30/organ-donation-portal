const router = require("express").Router();
const User = require("../models/User");
const Detail = require("../models/indivisual");
const hospitalDetail = require("../models/hospital");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../routes/validation");

const { Schema } = require("mongoose");
const { schema, db } = require("../models/User");

router.post("/register", async (req, res) => {
  //VALIDATING THE USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking that the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exists");

  // const userExist = await User.findOne({ username: req.body.username });
  // if (userExist) return res.status(400).send("username already taken");

  //checking if the password and confirmPassword are same
  const checkPassword = bcrypt.compare(
    req.body.password,
    req.body.confirmPassword
  );
  if (!checkPassword) {
    return res.status(400).send("password doesn't match");
  }

  //Hashing of password
  var salt = bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(req.body.password, salt);
  confirmHashedPassword = await bcrypt.hash(
    req.body.confirmHashedPassword,
    salt
  );

  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    confirmPassword: confirmHashedPassword,
  });
  console.log(user);
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.send({ message: err });
  }
});

//as a indivisual
router.post("/indivisual", async (req, res) => {
  const detail = new Detail({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    bloodGroup: req.body.bloodgroup,
    email: req.body.email,
    contactNumber: req.body.phoneNumber,
  });
  try {
    const saveDetail = await detail.save();
    res.send(console.log("details added!!"));
  } catch (err) {
    res.send({ message: err });
  }
});

//as a hospital/organisation
router.post("/hospital", async (req, res) => {
  const hospitaldetail = new hospitalDetail({
    hospitalName: req.body.hospitalName,
    patientfirstName: req.body.patientfirstName,
    patientlastName: req.body.patientlastName,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    bloodGroup: req.body.bloodgroup,
    organ: req.body.organ,
    email: req.body.email,
    patientcontactNumber: req.body.patientcontactNumber,
    hospitalcontactNumber: req.body.hospitalcontactNumber,
  });
  try {
    const savehospitalDetail = await hospitaldetail.save();
    res.send({
      details: hospitaldetail.date,
      name: hospitaldetail.patientfirstName,
    });
  } catch (err) {
    res.send({ message: err });
  }
});
//search all
router.get("/", async (req, res) => {
  try {
    const specificUser = await User.find();
    res.send(specificUser);
  } catch (err) {
    res.send({ message: err });
  }
});

//search by id
router.get("/:userId", async (req, res) => {
  try {
    const findUser = await hospitalDetail.findById(req.params.userId);
    res.send(findUser);
  } catch (err) {
    res.send({ message: err });
  }
});

//get by city
router.get("/city/:city", async (req, res) => {
  try {
    const specificCity = await hospitalDetail.findOne({
      city: req.params.city,
    });
    res.send(specificCity);
  } catch (err) {
    res.send({ message: err });
  }
});

//search by organ
router.get("/organ/:organ", async (req, res) => {
  try {
    const specificOrgan = await hospitalDetail.findOne({
      organ: req.params.organ,
    });
    res.send(specificOrgan);
  } catch (err) {
    res.send({ message: err });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //VALIDATING THE USER
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //checking that the user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not registered");
  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");
  // create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
