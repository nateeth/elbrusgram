const { Router } = require('express');
const { User, Group, Message, UserGroup, Reaction } = require('../../db/models');
const groupsRouter = Router();

groupsRouter.route('/').get(async (req, res) => {
  try {
    const groups = await Message.findAll({
      order: [['id', 'DESC']],
      include: [ { model: User }],
    });
    res.json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: 'Ошибка получения сообщений', message: error.message });
  }
});

module.exports = groupsRouter;
