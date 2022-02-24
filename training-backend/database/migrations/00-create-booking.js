'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('Waiting', 'Canceled', 'Done'),
      },
      nameCustomer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      idRestaurant: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
      numberPeople: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
      arrivalTime: {
        type: Sequelize.INTEGER(20).UNSIGNED,
        allowNull: true,
      },
      idTable: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedBy: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      deletedBy: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bookings');
  }
};
