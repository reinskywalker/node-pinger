const { hitURL } = require('./httpClient');
const { logToConsole, logToFile } = require('./logger');

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSequentialPing(config) {
  const startTime = Date.now();
  let stopAfter = config.duration ? config.duration * 1000 : null;

  while (true) {
    const result = await hitURL(config);
    logToConsole(result, config);
    logToFile(result, config);

    if (stopAfter && Date.now() - startTime >= stopAfter) {
      console.log('🛑 Benchmark selesai (duration cap reached)');
      break;
    }

    await delay(config.interval * 1000);
  }
}

module.exports = { startSequentialPing };
