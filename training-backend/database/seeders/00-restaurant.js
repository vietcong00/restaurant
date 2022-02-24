const bCrypt = require('bcrypt');
module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('restaurants', [
            {
                name: 'Beefsteak',
                address: 'menu1.jpg',
                phone: '350.000 VNĐ',
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
            {
                name: 'Beefsteak2',
                address: 'Xã Đàn',
                phone: '22222222',
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            }, {
                name: 'Beefsteak3',
                address: 'Láng',
                phone: '33333333',
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            }, {
                name: 'Beefsteak4',
                address: 'Đại La',
                phone: '44444444',
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: 1,
                updatedBy: 1,
            },
        ], {});
    },

    down: (queryInterface) =>
        queryInterface.bulkDelete('restaurants', null, {})

};
