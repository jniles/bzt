/**
 * ZeroTier API Library
 */

import got from 'got';

const { ZT_TOKEN, ZT_NETWORK_ID } = process.env;

const params = {
  prefixUrl: 'https://my.zerotier.com/api/v1/',
  headers: { Authorization: `bearer ${ZT_TOKEN}` },
};

/**
 * @function getNetworks();
 *
 */
export function getNetworks() {
  return got('network/', params).json();
}

/**
 * @function getNetworkById()
 *
 */
export function getNetworkById(nid) {
  return got(`network/${nid}`, params).json();
}

/** @function getDefaultNetwork
 *
 * Returns the default network provided by the ZT_NETWORK_ID
 * parameter.
 */
export function getDefaultNetwork() {
  return getNetworkById(ZT_NETWORK_ID);
}

/**
 * @function getOnlineClients
 *
 * @description
 * Returns a list of the clients that are currently available and online.
 */
export async function getOnlineClients(nid) {
  return (await got(`network/${nid}/member`, params).json())
    .filter(node => node.online);
}
