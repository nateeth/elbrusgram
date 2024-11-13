const express = require('express');
const verifyRefreshToken = require('../middleware/verifyRefreshToken')
const generateTokens = require('../utils/generateTokens')
const cookieConfig = require('../configs/cookieConfig')

const refreshRouter = express.Router();

refreshRouter
    .route('/refresh')
    .get(verifyRefreshToken, (req, res)=>
    {
        const {user} = res.locals;
        const {accessToken, refreshToken} = generateTokens({user});
        res
            .status(200)
            .cookie('refreshToken', refreshToken, cookieConfig)
            .json({user, accessToken})
    });

module.exports = refreshRouter;