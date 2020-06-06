# PS2 collector

[![David DM Badge](https://david-dm.org/microwavekonijn/ps2-collector.svg)](https://david-dm.org/microwavekonijn/ps2-collector)
[![David DM Badge](https://david-dm.org/microwavekonijn/ps2-collector/dev-status.svg)](https://david-dm.org/microwavekonijn/ps2-collector?type=dev)


## Requirements
- Node v12;
- MongoDB;
- Docker(optional).

## Config
Set the environment variables:
- `CENSUS_SERVICE_ID` to your cenus service id(required);
- `LOG_LEVEL` to manage the log level(optional; silly, verbose, debug, info(default), warn, error).

## Running

### Node
- Run `npm ci`(install dependecies);
- Run `npm run build`;
- Run `npm start`.

### Node(dev)
- Run `npm ci`(install dependecies);
- Run `npm run dev`.

### Docker
- Run `npm run up` or `npm run docker:up`.

## Note
You can modifiy the `/src/config/collector.ts` to change what will be collected.
