const config = {
  //   session: {
  //     secret: process.env.SESSION_SECRET || "secret_key",
  //     db: {
  //       uri: process.env.MONGODB_URI || "mongodb://localhost/room-app",
  //       collection: "sessions",
  //     },
  //   },
  jwt: {
    secret: process.env.JWT_SECRET || "secret_key",
    signup: {
      time: process.env.JWT_SIGNUP_TIME || "1d",
    },
  },
  db: {
    mongo: {
      host: process.env.MONGODB_URI || "mongodb://localhost/quien-es-quien",
    },
  },
};

export default config;
