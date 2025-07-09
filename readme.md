  
# Node Pinger

Node.js script to ping a specific URL at defined intervals with optional retry and logging.

## Features

- Ping any HTTP/HTTPS endpoint repeatedly
- Control request interval and total duration
- Retry failed requests with delay
- Log results to timestamped files
- No external dependencies except `axios`

## Requirements

- Node.js 14+

## Installation

```bash
git clone https://github.com/reinskywalker/node-pinger.git
cd node-pinger
npm install
````

## Usage

Run the pinger with arguments:

```bash
npm run ping -- --url="https://example.com" --interval=10 --duration=0 --retries=3 --retryDelay=5 --expectStatus=200 --log=true
```

## Arguments

| Flag             | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `--url`          | Target URL to ping (required)                                    |
| `--interval`     | Delay between requests (in seconds)                              |
| `--duration`     | How long to keep pinging (in seconds). Use `0` to run forever    |
| `--retries`      | Number of times to retry a failed request or non-matching status |
| `--retryDelay`   | Delay between retries (in seconds)                               |
| `--expectStatus` | Expected HTTP status code (e.g. `200`)                           |
| `--log`          | Whether to write output to log file (`true` or `false`)          |

## Output

* Console will show timestamped result of each request
* If logging is enabled, log file is saved under `src/logs/` with format:

  ```
  YYYY-MM-DD_01.log
  YYYY-MM-DD_02.log
  ```

Each run will generate a new log file with incremented index in src\logs.

## Example

```bash
npm run ping -- --url="https://reynaldi.dev/" --interval=10 --duration=0 --retries=3 --retryDelay=5 --expectStatus=200 --log=true
```