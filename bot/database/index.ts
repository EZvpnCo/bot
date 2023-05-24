import { Sequelize, } from 'sequelize';

const sequelize = new Sequelize(
    'ezvpn_bot',
    'root',
    'rasoul707',
    {
        host: '0.0.0.0',
        dialect: 'mysql'
    }
);

export default sequelize