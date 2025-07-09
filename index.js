const { parseArgs } = require('./src/cli');
const { startSequentialPing } = require('./src/scheduler');
const { validateConfig } = require('./src/config');

const config = parseArgs(process.argv);

if (!validateConfig(config)) {
  process.exit(1);
}

startSequentialPing(config);
