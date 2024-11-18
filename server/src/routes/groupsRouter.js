const { Router } = require('express');
const { User, Group, Message, UserGroup, Reaction } = require('../../db/models');
const verifyAccessToken = require('../middleware/verifyAccessToken');
const groupsRouter = Router();

groupsRouter.route('/').get(async (req, res) => {
  try {
    const groups = await Group.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: User,
          as: 'Owner', 
          attributes: ['id', 'name', 'nick'], 
        },
        {
          model: User,
          as: 'GroupUser', 
          attributes: ['id', 'name', 'nick'], 
          through: { attributes: [] }, 
        },
      ],
    });
    
    res.json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: 'Ошибка получения групп', message: error.message });
  }
})
.post(verifyAccessToken, async (req, res) => {
  const {title, description, chatflag} = req.body
  const ownerId = res.locals.user.id
  try {
    const newGroup = await Group.create({
      title,
      description,
      ownerid: ownerId,
      chatflag,
    });
    res.status(201).json(newGroup)
  } catch (error) {
    console.error('Ошибка при создании группы:', error)
    res.status(500).json({ text: 'Ошибка при создании группы', message: error.message });
  }
})

module.exports = groupsRouter;
