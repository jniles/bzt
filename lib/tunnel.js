import { spawn } from 'child_process';
import debug from 'debug';


export function tunnelToServer(host) {
  const logger = debug('bzt:ssh');

  const [address] = host.config.ipAssignments;
  const LOCAL_PORT = process.env.PORT;

  logger(`Opening a tunnel to ${address}:${LOCAL_PORT} via an SSH SOCKS proxy.`);

  const hostname = `${process.env.SERVER_USERNAME}@${address}`;
  
  // open the proxy
  const ssh = spawn('ssh', ['-C2qTnN', '-D', LOCAL_PORT, hostname]);

  ssh.stdout.on('data', (data) => {
    logger(`stdout: ${data}`);
  });

  ssh.stderr.on('data', (data) => {
    logger(`stderr: ${data}`);
  });

  ssh.on('close', (code) => {
    logger(`child process exited with code ${code}`);
  });

  process.on('exit', () => {
    logger(`Killing SSH Tunnel`);
    ssh.kill();
  });
}

