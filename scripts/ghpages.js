var ghpages = require('gh-pages');

ghpages.publish('dist', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Published to GH Pages');
});
