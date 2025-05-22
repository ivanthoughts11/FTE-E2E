export const validUserCredentials = {
  number: process.env.CUSTOMER_NUMBER || "09123456789",
  otp: process.env.CUSTOMER_OTP || "4209",
};

export const emptyUserCredentials = {
  number: "",
};

export const invalidNumber = {
  number: "091234567891",
};

export const invalidOtp = {
  number: "09123456788",
  otp: "1234",
};