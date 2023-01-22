import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "..";

class Faq extends Model<InferAttributes<Faq>, InferCreationAttributes<Faq>> {
    declare id: CreationOptional<number>;
    declare subject: string;
    declare content: string;
    declare lang: string;
}

Faq.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        subject: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        lang: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "fa"
        },
    },
    {
        tableName: 'bot_faq',
        timestamps: false,
        sequelize,
    }
);


export default Faq