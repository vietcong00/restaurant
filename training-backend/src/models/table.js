module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define('Table', {
        name: {
            type: DataTypes.STRING,
        },
        status: {
            allowNull: false,
            type: DataTypes.ENUM('booked', 'used', 'ready'),
        },
        nameCustomer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        arrivalTime: {
            type: DataTypes.INTEGER(20).UNSIGNED,
            allowNull: true,
        },
        numberSeat: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
        idRestaurant: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
        deletedBy: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
    }, {
        tableName: 'tables',
        paranoid: true,
    });
    Table.associate = function (models) {
        // define association of this model
        Table.belongsTo(models.Restaurant, { as: 'restaurant', foreignKey: 'idRestaurant' });
    };
    return Table;
};
