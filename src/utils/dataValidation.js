import z from "zod";

export const validateUserData = (data) => {
  return z
    .object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(8),
    })
    .parse(data);
};

export const validateUserLogin = (data) => {
  return z
    .object({
      email: z.string().email(),
      password: z.string().min(8),
    })
    .parse(data);
};
