const bCrypt = require('bcrypt');
module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('users', [
            {
                fullName: 'admin',
                phone: '535352525',
                email: 'user1@tokyotechlab.com',
                position: 'supervisor',
                idRestaurant: 1,
                password: bCrypt.hashSync('tt@1234', bCrypt.genSaltSync(8), null),
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
            {
                fullName: 'user2',
                phone: '535352525',
                email: 'user2@tokyotechlab.com',
                position: 'cashier',
                idRestaurant: 1,
                password: bCrypt.hashSync('tt@1234', bCrypt.genSaltSync(8), null),
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
            {
                fullName: 'user3',
                phone: '535352525',
                email: 'tientung@gmail.com',
                position: 'waiter',
                idRestaurant: 1,
                password: bCrypt.hashSync('123456', bCrypt.genSaltSync(8), null),
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
        ], {});
    },

    down: (queryInterface) =>
        queryInterface.bulkDelete('users', null, {})

};
