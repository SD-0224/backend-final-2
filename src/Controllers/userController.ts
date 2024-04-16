import { User } from "../Models/user";
import bcrypt, { genSaltSync } from "bcrypt";
import generateFakeSecretKey from "../Utils/helper";
import { validateEmail, validatePassword } from "../Validators/errorHandler";
const jwt = require("jsonwebtoken");
//Generate fake secret key
const secretKey = generateFakeSecretKey();

export const registerNewUser = async (userData: any) => {
  const { email, password, googleId } = userData;

  try {
    if (!email || email.trim() === "") {
      return { error: "Email is required" };
    }

    if (!password || password.trim() === "") {
      return { error: "Password is required" };
    }

    if (!validateEmail(email)) {
      return { error: "Invalid email" };
    }

    if (!validatePassword(password)) {
      return { error: "Invalid password" };
    }

    // Hashing the password before storing in the db
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Create a new user
    const newUser = await User.create({
      email: email || "",
      password: hash,
      googleId: googleId || null,
    });

    return newUser;
  } catch (error) {
    console.error("Error while registering new user:", error);
    return null;
  }
};

//Create new user from existing account 
export const register = async (req: any, res: any) => {
  try {
    const newUser = await registerNewUser(req.body);
    if (newUser) {
      // res.render("signUp");
      res.status(201).json(newUser);
    } else {
      res.status(500).json({ error: "Failed to register user" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports.loginUser = async (req, res) => {
  try {
    const { password, identifier } = req.body;
    console.log("Identifier:", identifier);
    console.log("Password:", password);

    let user;
    if (validateEmail(identifier)) {
      user = await User.findOne({ where: { email: identifier } });
    } else {
      return res.status(400).json({ error: "Invalid email or username" });
    }

    console.log("User:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    console.log("Is Password Correct:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Wrong username or password!" });
    }

    console.log("Login successful");

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );
console.log("secretKey",secretKey);
res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Middleware to verify JWT token

module.exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token; 
    console.log("value of token");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token is missing" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};


