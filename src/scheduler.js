const { hitURL } = require('./httpClient');
const { logToConsole, logToFile } = require('./logger');

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSequentialPing(config) {
  const startTime = Date.now();
  const stopAfter = config.duration > 0 ? config.duration * 1000 : null;

  while (true) {
    const result = await hitURL(config);
    logToConsole(result, config);
    logToFile(result, config);

    if (stopAfter && Date.now() - startTime >= stopAfter) {
      console.log('🛑 Benchmark selesai (duration reached)');
      break;
    }

    await delay(config.interval * 1000);
  }
}

module.exports = { startSequentialPing };
