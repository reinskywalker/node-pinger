const fs = require('fs');
const path = require('path');

function logToConsole(result, config) {
  const time = new Date().toISOString();
  if (result.ok) {
    console.log(`[${time}] ✅ ${result.status} (${result.duration} ms)`);
  } else {
    console.log(`[${time}] ❌ ERROR: ${result.error || result.status}`);
  }
}

function logToFile(result, config) {
  if (!config.log) return;
  const dir = path.join(__dirname, 'logs');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const file = path.join(dir, `${new Date().toISOString().slice(0, 10)}.log`);
  const entry = `${new Date().toISOString()} | ${result.ok ? result.status : 'ERROR'} | ${result.duration}ms\n`;
  fs.appendFileSync(file, entry);
}

module.exports = { logToConsole, logToFile };
