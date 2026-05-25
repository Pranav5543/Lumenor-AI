const { spawnSync } = require('node:child_process');
const { existsSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const localPnpm = join(root, '.tools', 'pnpm9', 'package', 'bin', 'pnpm.cjs');
const args = process.argv.slice(2);
const hasLocalPnpm = existsSync(localPnpm);

const command = hasLocalPnpm ? process.execPath : process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const commandArgs = hasLocalPnpm ? [localPnpm, ...args] : args;

const result = spawnSync(command, commandArgs, {
  cwd: root,
  stdio: 'inherit',
  shell: false,
  env: process.env
});

process.exit(result.status ?? 1);
