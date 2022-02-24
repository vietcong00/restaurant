module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
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
    }, {
        tableName: 'categories',
        paranoid: true,
    });
    Category.associate = function (models) {
        // define association of this model
        Category.hasMany(models.Product, { as: 'products', foreignKey: 'idCategory' });
    };
    // db.food.hasMany(db.meal, {as : 'Food', foreignKey : 'idFood'});

    return Category;
};
