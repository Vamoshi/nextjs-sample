import { InferSchemaType, Schema, Types, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    bookmarkes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

type UserDocument = InferSchemaType<typeof UserSchema> &
  Document & {
    _id: Types.ObjectId;
  };
export type { UserDocument };

export default User;
