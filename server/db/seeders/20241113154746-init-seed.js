'use strict';
const { hashSync } = require('bcrypt');
const user = require('../models/user');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Alex',
          email: 'alex@example.com',
          hashpass: hashSync('123', 10),
          nick: 'nickalex',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Charlie',
          email: 'charlie@example.com',
          hashpass: hashSync('123', 10),
          nick: 'nickchar',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Groups',
      [
        {
          title: 'general',
          description: 'Chat for all',
          ownerid: 1,
          chatflag: '0',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Charlie',
          description: 'Chat with Charlie',
          ownerid: 1,
          chatflag: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Messages',
      [
        {
          text: 'Privet medved!',
          authorid: 1,
          groupid: 1,
          authorName: 'Alex',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'Privet sosed!',
          authorid: 2,
          groupid: 1,
          authorName: 'Charlie',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'UserGroups',
      [
        {
          groupid: 1,
          userid: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          groupid: 1,
          userid: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );  
      await queryInterface.bulkInsert(
        'Reactions',
        [
          {
            reaction: '🥳',
            authorid: 1,
            messageid: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            reaction: '😉',
            authorid: 2,
            messageid: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {},
      );

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
