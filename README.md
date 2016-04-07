# twitch-follow-alerts-node

This project will poll the [Twitch.tv API](https://github.com/justintv/Twitch-API/blob/master/v3_resources/follows.md#get-channelschannelfollows) every twenty seconds and check for new followers. It will then fire a [desktop notification](https://github.com/mikaelbr/node-notifier) if any are found.

## Installation


```
git clone git@github.com:eddiezane/twitch-follow-alerts-node.git
cd twitch-follow-alerts-node
npm install
```

Replace your username in `index.js`.

```
node index.js
```