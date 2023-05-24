import { Sequelize, } from 'sequelize';

const sequelize = new Sequelize(
    'ezvpn_bot',
    'root',
    'rasoul707',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

export default sequelize