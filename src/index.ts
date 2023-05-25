import './setup-dotenv'; // Must be the first import
import logger from 'jet-logger';

import { environmentVariable } from '@src/utility/constant/environment-variable';
import { app } from './server';


// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' + 
  environmentVariable.port.toString());

app.listen(environmentVariable.port, () => logger.info(SERVER_START_MSG));
