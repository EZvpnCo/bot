import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "..";

class Tutorials extends Model<InferAttributes<Tutorials>, InferCreationAttributes<Tutorials>> {
    declare id: CreationOptional<number>;
    declare category: string;
    declare title: string;
    declare url: string | null;
    declare video: string | null
}

Tutorials.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        video: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'bot_tutorials',
        timestamps: false,
        sequelize,
    }
);


export default Tutorials