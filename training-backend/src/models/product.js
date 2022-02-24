module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
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
        tableName: 'products',
        paranoid: true,
    });
    Product.associate = function (models) {
        // define association of this model
        Product.belongsTo(models.Category, { as: 'category', foreignKey: 'idCategory' });
    };
    return Product;
};
