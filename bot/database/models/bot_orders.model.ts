import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "..";

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    declare id: CreationOptional<number>;
    declare account_id: number;
    declare price: number;
    declare date: string | undefined;
    declare status: string | undefined;
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'NOT_PAYED',
        },
    },
    {
        tableName: 'bot_orders',
        timestamps: false,
        sequelize,
    }
);


export default Order