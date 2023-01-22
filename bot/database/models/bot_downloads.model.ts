import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "..";

class Downloads extends Model<InferAttributes<Downloads>, InferCreationAttributes<Downloads>> {
    declare id: CreationOptional<number>;
    declare category: string;
    declare title: string;
    declare slug: string;
    declare download: [];
    declare file: string | null
}

Downloads.init(
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
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        download: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        file: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'bot_downloads',
        timestamps: false,
        sequelize,
    }
);


export default Downloads