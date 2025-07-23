import { UserModel } from "../database/db.js";
import { hashedPassword, comparePassword } from "../utils/password.js";
import { createToken } from "../utils/jwt.js";

export async function signupController(req, res) {
  let { name, email, password } = req.body;

  try {
    const hashedPass = await hashedPassword(password);

    await UserModel.create({
      name,
      email,
      password: hashedPass,
    });

    res
      .status(200)
      .json({ message: `User Registered`, data: { name, email, password } });
  } catch (err) {
    console.log(`Error during signup ${err}`);
    res.status(500).json({ message: `Server Error`, error: err });
  }
}

export async function signinController(req, res) {
  let { email, password } = req.body;

  const user = await UserModel.findOne({
    email: email,
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordMatched = await comparePassword(password, user.password);

  if (!isPasswordMatched) {
    res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = createToken({ id: user._id.toString() });

  res
    .cookie("token", jwtToken, {
      httpOnly: true,
      secure: true, // only over HTTPS
      sameSite: "Strict", // or "Lax" depending on your app
      maxAge: 10 * 60 * 1000, // 10 minutes
    })
    .status(200)
    .json({
      message: `You are successfully Signed In`,
      data: { email },
      authorization: token,
    });
}
