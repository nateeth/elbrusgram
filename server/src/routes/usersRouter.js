const { Router } = require('express');
const { User, Group, Message, UserGroup, Reaction } = require('../../db/models');
const usersRouter = Router();

usersRouter.route('/').get(async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['id', 'DESC']],
      include: [{ model: Reaction }],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: 'Ошибка получения сообщений', message: error.message });
  }
});

module.exports = usersRouter;
