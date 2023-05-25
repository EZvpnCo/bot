import { Sequelize, } from 'sequelize';

const sequelize = new Sequelize(
    'ezvpn_bot',
    'root',
    'tehONDretSVERveRnive',
    {
        host: '0.0.0.0',
        dialect: 'mysql'
    }
);


export default sequelize