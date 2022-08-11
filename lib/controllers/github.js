const { Router } = require('express');
const jwt = require('jsonwebtoken');
const GithubUser = require('../models/GithubUser');
const {
  exchangeCodeForToken,
  getGithubProfile,
} = require('../services/github');


module.exports = Router()
  .get('/login', async (req, res) => {
    // TODO: Kick-off the github oauth flow
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  });