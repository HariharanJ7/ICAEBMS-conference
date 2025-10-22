import { Sequelize } from 'sequelize';

const dialect = process.env.SQL_DIALECT || 'sqlite';

export const sequelize = new Sequelize({
  dialect,
  storage: process.env.SQL_STORAGE || './database.sqlite',
  logging: false
});
