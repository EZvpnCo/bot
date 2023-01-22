import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "..";

class Diagnosis extends Model<InferAttributes<Diagnosis>, InferCreationAttributes<Diagnosis>> {
    declare id: CreationOptional<number>;
    declare subject: string;
    declare content: string;
    declare lang: string;
}

Diagnosis.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lang: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "fa"
        },
    },
    {
        tableName: 'bot_diagnosis',
        timestamps: false,
        sequelize,
    }
);


export default Diagnosis