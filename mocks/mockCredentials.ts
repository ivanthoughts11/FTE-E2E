export const validAdminCredentials = {
  username: process.env.ADMIN_USERNAME || "superadmin@flyingtigersexpress.com",
  password: process.env.ADMIN_PASSWORD || "P@ssword123",
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