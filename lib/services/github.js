const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  //take code from github and exchange for token
  const client_id = process.env.GH_CLIENT_ID;
  const client_secret = process.env.GH_CLIENT_SECRET;

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Content_Type: 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  });
  const res = await response.json();
  console.log(res);
  return res.access_token;
};
const getGithubProfile = async (token) => {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  return response.json();
};

module.exports = { exchangeCodeForToken, getGithubProfile };
