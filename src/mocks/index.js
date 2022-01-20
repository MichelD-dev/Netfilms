if (process.env.NODE_ENV === 'development') {
  module.exports = require('./server')
} else if (process.env.NODE_ENV === 'test') {
  module.exports = require('./server-test')
} else {
  module.exports = require('./server')
}
