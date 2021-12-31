/**
 * ZeroTier API Library
 */

import got from 'got';

function getParameters() {
  return {
    prefixUrl: 'https://my.zerotier.com/api/v1/',
    headers: { Authorization: `bearer ${process.env.ZT_TOKEN}` },
  };
}


/**
 * @function getNetworks();
 *
 */
export function getNetworks() {
  return got('network/', getParameters()).json();
}

/**
 * @function getNetworkById()
 *
 */
export function getNetworkById(nid) {
  return got(`network/${nid}`, getParameters()).json();
}

/** @function getDefaultNetwork
 *
 * Returns the default network provided by the ZT_NETWORK_ID
 * parameter.
 */
export function getDefaultNetwork() {
  return getNetworkById(process.env.ZT_NETWORK_ID);
}

/**
 * @function getOnlineClients
 *
 * @description
 * Returns a list of the clients that are currently available and online.
 */
export async function getOnlineClients(nid) {
  return (await got(`network/${nid}/member`, getParameters()).json())
    .filter(node => node.online);
}
