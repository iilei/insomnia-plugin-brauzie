/**
 * Example template tag that generates a random number
 * between a user-provided MIN and MAX
 */
function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

module.exports.templateTags = [{
  name: 'brauzie',
  displayName: 'Brauzie JWT',
  description: 'JWT obtained by brauzie as ENV Var for use in Bearer Authorization',
  args: [
    {
      displayName: 'jwt',
      description: 'Where to obtain the jwt obtained by brauzie',
      type: 'string',
      defaultValue: 'http://localhost:8000/jwt.json'
    },
    {
      displayName: 'prop',
      description: 'Most likely `access_token`',
      type: 'string',
      defaultValue: 'access_token'
    },
  ],
  async run(context, jwt, prop) {
    const token = await fetch(jwt)
      .then(status)
      .then(response => response.json().then(data => data[ prop ])
      )
      .catch(function () {
        throw new Error(`Bad response from ${jwt}. A static server is expected to expose brauzies jwt here`)
      });
    return token;
  }
}];
