const axios = require('axios');

async function hitURL(config) {
  let attempts = 0;

  while (attempts <= config.retries) {
    const start = Date.now();
    try {
      const res = await axios({
        url: config.url,
        method: config.method,
        timeout: 10000
      });
      const duration = Date.now() - start;

      return {
        ok: res.status === config.expectStatus,
        status: res.status,
        duration
      };
    } catch (err) {
      attempts++;
      if (attempts > config.retries) {
        return {
          ok: false,
          error: err.message || err.code,
          duration: Date.now() - start
        };
      }
      await new Promise(res => setTimeout(res, config.retryDelay));
    }
  }
}

module.exports = { hitURL };
