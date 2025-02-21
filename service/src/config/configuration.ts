export interface IDatabaseConfiguration {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface IConfiguration {
  port: number;
  env: string;
  appUrl: string;
  jwtSecret: string;
  database: IDatabaseConfiguration;
}

export default (): IConfiguration => ({
  port: parseInt(process.env.PORT, 10) || 5001,
  env: process.env.NODE_ENV || 'development',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || 'jwtSecret',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'memory-lane-db',
  },
});
