import 'reflect-metadata';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // No CommonJS, o TypeORM entende caminhos relativos com __dirname facilmente
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    logging: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);