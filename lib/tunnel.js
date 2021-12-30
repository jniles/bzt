import { spawn } from 'child_process';
import debug from 'debug';

const logger = debug('bzt:proxy');

export function tunnelToServer(host) {
  const [address] = host.config.ipAssignments;

  logger(`Opening a tunnel to ${address}:${PORT} via an SSH SOCKS proxy.`);

  const hostname = `${process.env.SERVER_USERNAME}@${address}`;
  
  // open the proxy
  const proxy = spawn('ssh', ['-C2qTnN', '-D', LOCAL_PORT, hostname]);

  proxy.stdout.on('data', (data) => {
    logger(`stdout: ${data}`);
  });

  proxy.stderr.on('data', (data) => {
    logger(`stderr: ${data}`);
  });

  proxy.on('close', (code) => {
    logger(`child process exited with code ${code}`);
  });
}

