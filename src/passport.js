const passport = require('passport');
const JwtStategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { config } = require('./config');
const UsersService = require('./services/users');

const usersService = new UsersService();

passport.use(
  new JwtStategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: config.authJwtSecret
    },
    async (payload, done) => {
      try {
        const user = await usersService.getUserById({ _id: payload.sub });

        if (!user) {
          return done(null, false);
        }

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
