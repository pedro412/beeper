require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  databaseUser: process.env.DATABASE_USER,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseUri: process.env.DATABASE_URI,
  databaseName: process.env.DATABASE_NAME,
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
  authJwtSecret: process.env.AUTH_JWT_SECRET
};

module.exports = { config };
