function parseArgs(argv) {
  const args = argv.slice(2);
  const config = {};

  args.forEach(arg => {
    const [key, val] = arg.replace(/^--/, '').split('=');
    config[key] = val;
  });

  return {
    url: config.url,
    interval: parseInt(config.interval) || 60,
    expectStatus: parseInt(config.expectStatus) || 200,
    duration: config.duration ? parseInt(config.duration) : 0,
    log: config.log === 'true',
    retries: parseInt(config.retries || 0),
    retryDelay: parseInt(config.retryDelay || 1000)
  };
}

module.exports = { parseArgs };
