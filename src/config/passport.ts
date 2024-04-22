import passport from "passport";
import { User } from "../Models/user";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { registerNewUser } from "../Controllers/userController";
import {logger} from "../config/pino";
import dotenv from 'dotenv';
dotenv.config();
passport.serializeUser((user, done) => {
  logger.info("Use serialization ");
  done(null, user.dataValues.userID);
});
passport.deserializeUser(async (id, done) => {
  try {
    logger.info(`Deserializing user  Done`)
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    logger.error("Error deserializing user:", error)
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.clientIDAuth,
      clientSecret: process.env.clientSecretAuth,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists
        const user = await User.findOne({ where: { googleId: profile.id } });

        if (!user) {
          const newUser = await registerNewUser({
            googleId: profile.id,
            email: profile.emails?.[0].value || "",
          });
        
          if (newUser) {
            done(null, newUser);
          } else {
            logger.error("Failed to create a new user");
            done(new Error("Failed to create a new user"), null);
          }
        
        
        } else {
          done(null, user);
        }
      } catch (error) {
        logger.error("Error during OAuth handling:", error);

        done(error, null);
      }
    }
  )
);

export default passport;
