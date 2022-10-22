export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        EMAIL: string;
        EMAIL_HOST: string;
        EMAIL_PASSWORD: string;
        JWT_SECRET_KEY: string;
    }
  }
}

