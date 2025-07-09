const { parseArgs } = require('./src/cli');
const { startSequentialPing } = require('./src/scheduler');
const { validateConfig } = require('./src/config');

const config = parseArgs(process.argv);

if (!validateConfig(config)) {
  process.exit(1);
}

if (config.runEvery) {
  const intervalMs = parseInt(config.runEvery) * 1000;

  console.log(`Running benchmark every ${config.runEvery}s...\n`);
  
  startSequentialPing(config);

  setInterval(() => {
    startSequentialPing(config);
  }, intervalMs);
} else {
  startSequentialPing(config);
}
