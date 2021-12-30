import _ from 'dotenv/config';
import readFile from 'fs';
import enquire from 'enquirer';
import debug from 'debug';

import { getDefaultNetwork, getOnlineClients } from './lib/zt.js';
import { tunnelToServer } from './lib/tunnel.js';

const { Select } = enquire;
const { ZT_TOKEN, ZT_NETWORK_ID } = process.env;

const log = debug('bzt');

async function main() {
  try {
    log(`Using network: ${ZT_NETWORK_ID}.`);

    const clients = await getOnlineClients(ZT_NETWORK_ID);

    log(`There are ${clients.length} online clients.`);

    const server = await selectServerToConnect(clients);

    tunnelToServer(server);
  } catch (e) {
    log('error is:', e);
  }
}


async function selectServerToConnect(servers) {
  // make a pretty choice list for the user
  const choices = servers 
    .map(node => ({
      name : node.name,
      hint : node.description,
    }));

  const prompt = new Select({
    name : 'server',
    message : 'The following servers are online.  Please select the server to connect to:',
    choices,
  });

  const choice = await prompt.run();

  return servers
    .filter(node => node.name === choice)
    .pop();
}

main();
