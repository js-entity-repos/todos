var ghpages = require('gh-pages');

ghpages.publish('dist', {
  user: {
    name: 'HT2 Bot',
    email: 'hello@ht2labs.com'
  },
  repo: `https://${process.env.GH_TOKEN}@github.com/js-entity-repos/todos.git`,
  silent: true
}, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Published to GH Pages');
});
