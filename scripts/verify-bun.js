// scripts/verify-bun.js
if (!process.env.BUN) {
  console.error(`
❌ This project requires Bun.

Please install and use Bun to run this project:
  curl -fsSL https://bun.sh/install | bash
Then use:
  bun install
`);
  process.exit(1);
}
