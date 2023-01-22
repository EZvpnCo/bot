import { Sequelize, } from 'sequelize';

const sequelize = new Sequelize(
    'ezshell',
    'ezshell',
    'FdG6FTH2aHkF5BTX',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

export default sequelize