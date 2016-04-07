module.exports = function (username) {
  'use strict'

  const request = require('request')
  const notifier = require('node-notifier');

  // const username = 'eddiezane'
  const url = 'https://api.twitch.tv/kraken/channels/' + username + '/follows'

  let lastFollower

  function getFollowers () {
    return new Promise((resolve, reject) => {
      request({ url, json: true }, (err, resp, body) => {
        if (err) {
          reject(err)
        }

        const followers = body.follows.map(follower => {
          return { id: follower.user._id, name: follower.user.name }
        })

        resolve(followers)
      })
    })
  }

  function notifyNewFollower (name) {
    console.log('Notifying about: ' + name)
    notifier.notify({
      title: 'New Follower',
      message: name + ' is now following you'
    })
  }

  setInterval(() => {
    getFollowers()
    .then(followers => {
      if (!lastFollower) {
        lastFollower = followers[0]
        return
      }

      if (followers[0].id === lastFollower.id) {
        console.log('No new followers')
        return
      }

      console.log('Should have a new follower')

      let newFollowers = []
      let lastPass
      for (let follower of followers) {
        if (follower.id === lastFollower.id) {
          lastFollower = lastPass
          break
        }

        lastPass = follower

        newFollowers.push(follower)
      }

      newFollowers.forEach(follower => {
        notifyNewFollower(follower.name)
      })
    })
    .catch(err => {
      console.error(err)
    })
  }, 1000 * 20)
}
