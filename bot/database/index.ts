import { Sequelize, } from 'sequelize';

const sequelize = new Sequelize(
    'ezvpn_bot',
    'ezvpn_bot',
    'BFadSaFNpefXh75b',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

export default sequelize