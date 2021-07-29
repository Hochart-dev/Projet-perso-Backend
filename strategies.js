const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');

const { ExtractJwt } = require('passport-jwt');
const { connection, secretKey } = require('./conf');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (formMail, formPassword, done) => {
      const sql = 'SELECT userName, email, password FROM users WHERE email = ?';
      const sqlValues = [formMail];
      try {
        const [[results]] = await connection.query(sql, sqlValues);
        if (!results.email) {
          throw new Error();
        }
        if (!bcrypt.compareSync(formPassword, results.password)) {
          throw new Error();
        }
        delete results.password;
        done(null, results);
      } catch (err) {
        done(err);
      }
    }
  )
);
passport.use(
  new JWTStrategy(
    {
      secretOrKey: secretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (user, done) => {
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
