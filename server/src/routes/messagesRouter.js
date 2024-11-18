const { Router } = require('express');
const { User, Group, Message, UserGroup, Reaction } = require('../../db/models');
const messagesRouter = Router();

messagesRouter.route('/').get(async (req, res) => {
  try {
    const message = await Message.findAll({
      order: [['id', 'DESC']],
      include: [{ model: Reaction }, { model: User }, { model: Group }],
    });
    res.json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: 'Ошибка получения сообщений', message: error.message });
  }
});

messagesRouter.route('/:groupId').get(async (req,res) => {
  try {
    const {groupId} = req.params
    const groupMessages = await Message.findAll({
      where: {groupid: groupId}
    })
    return res.status(200).json(groupMessages)
  } catch (error) {
    console.error('Ошибка при получении сообщений:', error) 
  }
})


module.exports = messagesRouter;
