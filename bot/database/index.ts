import { Sequelize, } from 'sequelize';

const sequelize = new Sequelize(
    'ezvpn_main',
    'ezvpn_main',
    'cNsrjwMNR54WcFA5',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

export default sequelize