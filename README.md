# Request inspector

> Used to inspect request details

## Scripts

- `npm run build`: compile TypeScript files into JavaScript ones into the `dist` directory
- `npm run dev`: watch source code and restart the app on each code modification (warning: this do not generates content in the `dist` directory)
- `npm run start`: run the `build` script to generate content in the `dist` directory and run the generated version (note: this do not watch on files change and do not rebuild or rerun the application)

## Configuration

You can configure the application using the following environment variables:

- `SERVER_PORT`: port this application should listen on (default: `8080`),
- `SERVER_HOST`: host this application should listen on (default: `0.0.0.0`),
- `RATE_LIMIT_NUMBER`: max number of allowed requests in a period of time (default: `100`),
- `RATE_LIMIT_PERIOD`: configure the period of time where requests should be counted (default: `5 minutes`).
