import bcrypt from "bcrypt";

import mongoose from "../config/glimdatabase";

const { Schema, model } = mongoose;

const allergyEnum = [
  "fragrances",
  "preservatives",
  "dyes",
  "metals",
  "latex",
  "parabens",
];

const prosEnum = ["organic", "vegan", "crueltyfree"];

const skinEnum = ["dry", "oily", "combination", "sensitive", "acne"];

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      // Checking that the email contains a @
      /^[\w.-]+@[\w.-]+\.\w{2,}$/,
      "Please provide a valid email address",
    ],
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: [
      {
        //Check for one lowercase, uppercase and a number
        validator: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value),
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and a number",
      },
    ],
  },
  accessToken: {
    type: String,
    default: () => bcrypt.genSaltSync(),
  },
  //Stuff the user can choose in the profile and will get recommendations for
  allergies: {
    type: [{ type: String, enum: allergyEnum }],
    default: [], // Default to an empty array for users with no allergies
  },
  pros: {
    type: [{ type: String, enum: prosEnum }],
    default: [], // Default to an empty array for users with no allergies
  },
  hair: {
    moisture: String,
    shape: String,
  },
  skin: {
    type: [{ type: String, enum: skinEnum }],
    default: [], // Default to an empty array for users with no allergies},
  },
});

export const User = model("User", userSchema);
