module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        status: {
            allowNull: false,
            type: DataTypes.ENUM('Waiting', 'Canceled', 'Done'),
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
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
        numberPeople: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
        idRestaurant: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        idTable: {
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
        tableName: 'bookings',
        paranoid: true,
    });
    Booking.associate = function (models) {
        // define association of this model
        Booking.belongsTo(models.Restaurant, { as: 'restaurant', foreignKey: 'idRestaurant' });
        Booking.belongsTo(models.Table, { as: 'table', foreignKey: 'idTable' });
    };
    return Booking;
};
