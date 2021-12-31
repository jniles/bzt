#!/usr/bin/env node

import dotenv from 'dotenv';
import enquire from 'enquirer';
import path from 'path';
import {fileURLToPath} from 'url';

// alias __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path : path.join(__dirname, '.env') });

import debug from 'debug';
import { getDefaultNetwork, getOnlineClients } from './lib/zt.js';
import { tunnelToServer } from './lib/tunnel.js';

const { ZT_TOKEN, ZT_NETWORK_ID } = process.env;

const { Select } = enquire;


async function main() {
  const log = debug('bzt');
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
