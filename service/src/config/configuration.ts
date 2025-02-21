export interface DatabaseConfiguration {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface IConfiguration {
  port: number;
  env: string;
  database: DatabaseConfiguration;
}

export default (): IConfiguration => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  env: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'memory-lane-db',
  },
});
