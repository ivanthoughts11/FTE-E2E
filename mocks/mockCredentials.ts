export const validAdminCredentials = {
  username: process.env.ADMIN_USERNAME || "superadmin@flyingtigersexpress.com",
  password: process.env.ADMIN_PASSWORD || "P@ssword123",
};

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

export const invalidAdminCredentials = {
  username: "sample@gmail.com",
  password: "wrongpassword",
};

export const invalidEmailAddress = {
  username: "email@asds",
  password: "password",
};

export const InvalidPassword = {
  username: "sample@gmail.com",
  password: "123",
};