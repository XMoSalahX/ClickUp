import dotenv from "dotenv";

dotenv.config();

// DotEnv Config To Get ALL Data From Our Environment
const {
  MONGO_USER,
  MONGO_PASSWORD,
  SERVER_PORT,
  DBNAME,
  FRONT_URL,
  EMAIL,
  EMAIL_PASS,
  HASH_KEY,
  SALT_ROUNDS,
  JWT_SECRET,
} = process.env;
// const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@private.hpheqtq.mongodb.net/?retryWrites=true&w=majority
// `;
const MONGO_URL = `mongodb://localhost:27017`;

// Export Env Variable
export const config = {
  mongo: {
    url: MONGO_URL,
    user: MONGO_USER,
    pass: MONGO_PASSWORD,
    dbName: DBNAME,
  },
  server: {
    port: SERVER_PORT,
    hash: HASH_KEY,
    salt: SALT_ROUNDS,
    jwt: JWT_SECRET,
  },
  front: {
    url: FRONT_URL,
  },
  mailer: {
    email: EMAIL,
    password: EMAIL_PASS,
  },
};
