'use strict'

const faker = require('faker')

const projects = [...Array(20)].map((element) => ({
  name: faker.name.jobTitle(),
  userId: faker.datatype.number({
    min: 1,
    max: 10,
  }),
}))
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Projects', projects, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Projects', null, {})
  },
}
