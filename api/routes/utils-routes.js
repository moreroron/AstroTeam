const router = require("express").Router();
const Twitter = require("twitter");
const keys = require("../keys");

router.get("/twitter", (req, res) => {
  const client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
  });

  const params = { screen_name: "AstroTeam6" };
  client.get("statuses/user_timeline", params, (error, tweets, response) => {
    if (!error) {
      const editedTweets = tweets.map(tweet => {
        return {
          date: tweet.created_at,
          text: tweet.text
        };
      });
      res.send(editedTweets);
    } else console.log(error);
  });
});

module.exports = router;
