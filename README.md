# Ranger API

This is a small JSON server used to store highlights coming from any [Ranger](https://github.com/frank06/ranger) compatible client, such as the [Ranger Chrome extension](https://github.com/frank06/ranger-extension).

Written using Express and Redis.

## Usage

Clone, `npm install` and run. Requires Redis listening on port `6379`.

## Wishlist

 - Tracking selected highlights over time (cron running phantomjs)
   - For example, if a highlight is the Bitcoin price index on some website, the value can be enabled for tracking and accessible via API -- making any bit of text on the Internet accessible via API
 - User auth and public pages for highlights

## License

Copyright ©2015 github.com/frank06

Licensed under the MIT license.