import { z } from "zod";

export function validateSignupData(req, res, next) {
  const requireBody = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at maximum 50 characters long"),
    email: z.email("Email must be a valid email"),
    password: z
      .string()
      .trim()
      .min(8, "Password must be 8-64 characters long")
      .max(64, "Password must be 8-64 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        "Password must be include uppercase, lowercase, number, and symbol"
      ),
  });

  const parsedDataWithSuccess = requireBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    const formattedErrors = parsedDataWithSuccess.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    res.status(422).json({
      message: "Incorrect Format",
      error: formattedErrors,
    });
    return;
  }

  next();
}

export function validateSigninData(req, res, next) {
  const requireBody = z.object({
    email: z.email("Email must be a valid email"),
    password: z.string().trim(),
  });

  const parsedDataWithSuccess = requireBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    const errors = parsedDataWithSuccess.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    res.status(422).json({
      message: "Incorrect Format",
      error: errors,
    });
    return;
  }

  next();
}
