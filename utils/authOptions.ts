import connectDB from "@/config/database";
import User, { UserDocument } from "@/models/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on Susccessful signin
    async signIn({ profile }: any) {
      // Connect to DB
      await connectDB();
      const userExists = await User.findOne({ email: profile.email });

      // Check if user Exists
      if (!userExists) {
        // Truncate since too long names could be problematic
        const username = profile.name.slice(0, 20);

        // If not, add
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // Return true to sign in
      return true;
    },
    async session({ session }: any) {
      // Get user from DB
      const user: UserDocument | null = await User.findOne({
        email: session.user.email,
      });
      // Assign user id to session
      session.user.id = user?._id.toString();
      // Return session
      return session;
    },
  },
};
