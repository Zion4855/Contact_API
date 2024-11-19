import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

//Register user
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (name == " " || email == " " || password == " ")
    return res.status(400).json({ message: "All fields are required" });

  let user = await User.findOne({ email });

  if (user) return res.json({ message: "User already exists" });

  const hashPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  res.json({ message: "User register successfully", user });
};

//Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email == "" || password == "")
    return res.status(400).json({ message: "All fields are required" });

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not find" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.json({ message: "Invalid credential" });

  const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"})

  res.json({ message: `Welcome back ${user.name}`, token });
};
