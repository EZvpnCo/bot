import { Sequelize, } from 'sequelize';

const sequelize = new Sequelize(
    'ezvpn_panel',
    'ezvpn_panel',
    'BFadSaFNpefXh75b',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

export default sequelize