import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'devu',
  password: 'devu',
  database: 'apinew',
  entities: [__dirname + '/**/*.model{.ts,.js}'],
  synchronize: true,
};

export default config;
