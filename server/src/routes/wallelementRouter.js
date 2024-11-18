const { Router } = require('express');
const { User, Group, Message, UserGroup, Reaction, Wallelement, Wallauthor } = require('../../db/models');
const wallelementRouter = Router();

wallelementRouter.route('/').get(async (req, res) => {
  try {
    const groups = await Wallelement.findAll({
      order: [['id', 'DESC']],
      include: [
        { model: User, as: 'Userwallprofile' },
      ],
    });
    res.json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: 'Ошибка получения сообщений', message: error.message });
  }
});

module.exports = wallelementRouter;
