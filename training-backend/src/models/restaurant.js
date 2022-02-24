module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define('Restaurant', {
        name: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        createdBy: {
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
        tableName: 'restaurants',
        paranoid: true,
    });
    Restaurant.associate = function (models) {
        // define association of this model
        // Food.belongsTo(models.Category, { as: 'category', foreignKey: 'idCategory' });
    };
    return Restaurant;
};
