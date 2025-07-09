const fs = require('fs');
const path = require('path');

function getLogFileName() {
    const dir = path.join(__dirname, 'logs');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const date = new Date().toISOString().slice(0, 10);
    const files = fs.readdirSync(dir).filter(f => f.startsWith(date));
    const index = (files.length + 1).toString().padStart(2, '0');

    return path.join(dir, `${date}_${index}.log`);
}

let currentLogFile = null;

function formatTimestamp() {
    const now = new Date();

    const pad = (n) => n.toString().padStart(2, '0');
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear().toString().slice(-2);
    const hour = pad(now.getHours());
    const min = pad(now.getMinutes());
    const sec = pad(now.getSeconds());
    const ms = now.getMilliseconds().toString().padStart(3, '0');

    return `${day}-${month}-${year} - ${hour}:${min}:${sec}.${ms}`;
}


function logToConsole(result) {
    const time = formatTimestamp();
    if (result.ok) {
        console.log(`[${time}] ✅ ${result.status} (${result.duration} ms)`);
    } else {
        console.log(`[${time}] ❌ ERROR: ${result.error || result.status}`);
    }
}


function logToFile(result, config) {
    if (!config.log) return;

    if (!currentLogFile) {
        currentLogFile = getLogFileName();
    }

    const time = new Date().toISOString();
    const entry = `${time} | ${result.ok ? result.status : 'ERROR'} | ${result.duration}ms\n`;
    fs.appendFileSync(currentLogFile, entry);
}

module.exports = { logToConsole, logToFile };
