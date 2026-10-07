// Sharding demo in ONE terminal: 4 shards one after another, then merge
// Playwright HTML, Allure and reportingLabs.
// Works the same on Windows, macOS and Linux.   Run:  node shard-demo.cjs
// (in CI the shards run in parallel on separate machines; here they run one by one)

const fs = require('fs');
const { spawnSync } = require('child_process');

const SHARDS = 4;
const PROJECT = 'chromium';

function run(cmd, env = {}) {
  console.log('> ' + cmd);
  // shell: true so "npx" resolves to npx.cmd on Windows
  return spawnSync(cmd, { stdio: 'inherit', shell: true, env: { ...process.env, ...env } }).status;
}
const exists = p => fs.existsSync(p);
const remove = p => fs.rmSync(p, { recursive: true, force: true });
const moveIfExists = (from, to) => { if (exists(from)) fs.renameSync(from, to); };

console.log('Cleaning previous reports...');
const old = ['blob-report', 'all-blob-reports', 'playwright-report', 'reports', 'allure-results',
  'all-allure-results', 'merged-allure-report', 'reporting-labs', 'reporting-labs-merged'];
for (const name of fs.readdirSync('.')) {
  if (old.includes(name) || /^(blob-shard|reports-shard|allure-shard|rl-shard)-\d+$/.test(name)) remove(name);
}

for (let i = 1; i <= SHARDS; i++) {
  console.log(`\n===== Shard ${i} of ${SHARDS} =====`);
  run(`npx playwright test --project=${PROJECT} --shard=${i}/${SHARDS}`);
  // failing tests are fine: the folders are moved anyway
  moveIfExists('blob-report', `blob-shard-${i}`);
  moveIfExists('reports/html-report', `reports-shard-${i}`);
  moveIfExists('allure-results', `allure-shard-${i}`);
  moveIfExists('reporting-labs', `rl-shard-${i}`);
}

console.log('\n===== Merge: Playwright HTML =====');
fs.mkdirSync('all-blob-reports', { recursive: true });
for (let i = 1; i <= SHARDS; i++) {
  if (exists(`blob-shard-${i}`)) fs.cpSync(`blob-shard-${i}`, 'all-blob-reports', { recursive: true });
}
run('npx playwright merge-reports --reporter=html ./all-blob-reports', { PLAYWRIGHT_HTML_OUTPUT_DIR: 'playwright-report' });

console.log('\n===== Merge: Allure =====');
if (exists('allure-shard-1')) {
  fs.mkdirSync('all-allure-results', { recursive: true });
  for (let i = 1; i <= SHARDS; i++) {
    if (exists(`allure-shard-${i}`)) fs.cpSync(`allure-shard-${i}`, 'all-allure-results', { recursive: true });
  }
  run('npx allure generate all-allure-results --clean -o merged-allure-report');
} else {
  console.log('(no Allure results, skipped)');
}

console.log('\n===== Merge: reportingLabs =====');
// The reportingLabs merge command. With SHARDS = 4 this runs:
//   npx reporting-labs merge rl-shard-1 rl-shard-2 rl-shard-3 rl-shard-4 -o reporting-labs-merged
// The list below is built from SHARDS, so the command still fits if you change the number of shards.
const rlShards = [];
for (let i = 1; i <= SHARDS; i++) if (exists(`rl-shard-${i}`)) rlShards.push(`rl-shard-${i}`);
run(`npx reporting-labs merge ${rlShards.join(' ')} -o reporting-labs-merged`);

const openCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
console.log('\nDone:');
console.log('  Playwright HTML : npx playwright show-report playwright-report');
console.log('  Allure          : npx allure open merged-allure-report');
console.log(`  reportingLabs   : ${openCmd} reporting-labs-merged${process.platform === 'win32' ? '\\' : '/'}index.html`);
