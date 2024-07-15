import 'dotenv/config';

const config = {
  ADMIN_PASSWORD: 'prime!@#$', // It's better to store this in an environment variable as well
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  ONE_WAY_HASH_SECRET: process.env.ONE_WAY_HASH_SECRET || 'default_secret',
  DISABLE_REQUEST_LOG: process.env.DISABLE_REQUEST_LOG === 'true',
  CORS: process.env.CORS ? process.env.CORS.split(',') : ['*'],
  MYSQL: {
    PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || '',
    DATABASE: process.env.DB_DATABASE || 'likolad',
    PASSWORD: process.env.DB_PASSWORD || '',
    POOL: {
      MAX: 5,
      MIN: 0,
      ACQUIRE: 30000,
      IDLE: 10000,
    }
  },
  AUTH: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'default_access_secret',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret',
    ACCESS_TOKEN_ACTIVE_TIME: process.env.ACCESS_TOKEN_ACTIVE_TIME || '2m',
    REFRESH_TOKEN_ACTIVE_TIME: process.env.REFRESH_TOKEN_ACTIVE_TIME || '1d',
  }
};

export default config;
