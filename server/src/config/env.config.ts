import dotenv from "dotenv";
dotenv.config();

export class EnvConfig {
  private env = process.env;

  getAppConfig() {
    return {
      environment: this.env.NODE_ENV,
      port: this.env.PORT,
    };
  }

  getDBConfig() {
    return {
      uri: this.env.DB_URI,
    };
  }

  getJWTConfig() {
    return {
      secret: this.env.JWT_SECRET,
      expiresIn: this.env.JWT_EXPIRES_IN,
      refreshSecret: this.env.JWT_REFRESH_SECRET,
      refreshExpiresIn: this.env.JWT_REFRESH_EXPIRES_IN,
      resetSecret: this.env.JWT_RESET_SECRET,
      resetExpiresIN: this.env.JWT_RESET_EXPIRES_IN,
    };
  }

  getAvatarConfig() {
    return {
      url: this.env.AVATAR_URL
    }
  }

  getStreamConfig() {
    return {
      apiKey: this.env.STREAMIFY_API_KEY,
      secret: this.env.STREAMIFY_API_SECRET
    }
  }
}