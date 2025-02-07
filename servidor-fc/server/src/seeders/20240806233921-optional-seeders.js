'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seedersPath = path.join(__dirname, 'optional');
    const seedFiles = fs.readdirSync(seedersPath).sort();

    for (const file of seedFiles) {
      if (file.endsWith('.js')) {
        const seeder = require(path.join(seedersPath, file));
        await seeder.up(queryInterface, Sequelize);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    const seedersPath = path.join(__dirname, 'optional');
    const seedFiles = fs.readdirSync(seedersPath).sort().reverse();

    for (const file of seedFiles) {
      if (file.endsWith('.js')) {
        const seeder = require(path.join(seedersPath, file));
        await seeder.down(queryInterface, Sequelize);
      }
    }
  }
};