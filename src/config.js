function validateConfig(config) {
  if (!config.url) {
    console.error('❌ Missing --url');
    return false;
  }
  return true;
}

module.exports = { validateConfig };
