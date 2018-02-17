var ghpages = require('gh-pages');

ghpages.publish('dist', {
  user: {
    name: 'HT2 Bot',
    email: 'hello@ht2labs.com'
  }
}, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Published to GH Pages');
});
