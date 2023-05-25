import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import { envVars } from '@src/constants/env-vars';
import server from './server';


// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' + 
  envVars.Port.toString());

server.listen(envVars.Port, () => logger.info(SERVER_START_MSG));
