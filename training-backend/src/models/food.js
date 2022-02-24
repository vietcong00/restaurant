module.exports = (sequelize, DataTypes) => {
    const Food = sequelize.define('Food', {
        name: {
            type: DataTypes.STRING,
        },
        imgLink: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.STRING,
        },
        descriptions: {
            type: DataTypes.STRING,
        },
        idCategory: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        tableName: 'foods',
        paranoid: true,
    });
    Food.associate = function (models) {
        // define association of this model
        Food.belongsTo(models.Category, { as: 'category', foreignKey: 'idCategory' });
    };
    return Food;
};
