import appInsights = require('applicationinsights');

import { configs } from 'config/environment';
import { app } from 'config/express';
import { connectDb } from 'config/mongoose';
import { logger } from 'config/winston';
import 'reflect-metadata'; // this shim is required

const { port, mode, connectionString, appInsightsKey } = configs;

appInsights
  .setup(appInsightsKey)
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .setUseDiskRetryCaching(true)
  .start();

logger.info(`Going to start the server on port: ${port}`);
connectDb(connectionString)
  .then(() => app.listen(port, () => logger.info(`server started on port ${port} (${mode})`)))
  .catch(err => logger.error(err));
