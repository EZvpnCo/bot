import { Sequelize, } from 'sequelize';

const sequelize = new Sequelize(
    'ezvpn_bot',
    'root',
    'tehONDretSVERveRnive',
    {
        dialect: 'mysql'
    }
);


export default sequelize