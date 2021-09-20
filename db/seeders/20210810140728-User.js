

const faker = require('faker')

const users = [...Array(10)].map((user) => ({
  email: faker.internet.email(),
  name: faker.name.findName(),
  password: faker.internet.password(),
}))
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
