const mongoose = require("mongoose");
const { createHmac } = require("crypto");
const { hashPassword } = require("../common/validation/passwordHashed");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    is_account_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    profile_photo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// CONVERTING PASSWORD HASH
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  const hashedPassword = await hashPassword(this.password);

  this.password = hashedPassword;

  next();
});


// userSchema.static(
//     "matchPasswordAndGenerateToken",
//     async function (email, password) {
//       const user = await this.findOne({ email });
//       if (!user) throw new Error("User not found");
  
//       const salt = process.env.SALT;
//       const hashedPassword = user.password;
  
//       const userProvidedHashed = createHmac("sha256", salt)
//         .update(password)
//         .digest("hex");
//       if (hashedPassword !== userProvidedHashed)
//         throw new Error("Incorrect Password");
  
//       const token = createTokenForUser(user);
//       return token;
//     }
//   );
  

const User = mongoose.model("user", UserSchema);

module.exports = { User };
