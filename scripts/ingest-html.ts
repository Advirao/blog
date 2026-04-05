/**
 * pnpm ingest — validates that all posts in src/lib/posts.ts have
 * corresponding HTML files in public/simulations/, and vice versa.
 *
 * Usage:  pnpm ingest
 */

import fs from 'fs'
import path from 'path'

const SIMULATIONS_DIR = path.resolve('public/simulations')
const POSTS_FILE = path.resolve('src/lib/posts.ts')

// ── Parse simulationFile paths from posts.ts ──────────────────────────────────
function extractSimulationFiles(): string[] {
  const source = fs.readFileSync(POSTS_FILE, 'utf-8')
  const matches = [...source.matchAll(/simulationFile:\s*['"]([^'"]+)['"]/g)]
  return matches.map((m) => m[1])
}

// ── Main ──────────────────────────────────────────────────────────────────────
function main() {
  console.log('\n📋  Running ingest validation...\n')

  const registeredPaths = extractSimulationFiles()
  const diskFiles = fs
    .readdirSync(SIMULATIONS_DIR)
    .filter((f) => f.endsWith('.html'))
    .map((f) => `/simulations/${f}`)

  let ok = true

  // Check: every registered file exists on disk
  for (const filePath of registeredPaths) {
    const fullPath = path.resolve('public', filePath.slice(1))
    if (!fs.existsSync(fullPath)) {
      console.error(`❌  MISSING  ${filePath}  (registered in posts.ts but not on disk)`)
      ok = false
    } else {
      console.log(`✅  OK       ${filePath}`)
    }
  }

  // Check: every disk file is registered
  for (const diskFile of diskFiles) {
    if (!registeredPaths.includes(diskFile)) {
      console.warn(`⚠️   ORPHAN   ${diskFile}  (on disk but not registered in posts.ts)`)
    }
  }

  if (ok) {
    console.log('\n✅  All simulation files accounted for.\n')
    process.exit(0)
  } else {
    console.error('\n❌  Ingest validation failed. Fix missing files then re-run.\n')
    process.exit(1)
  }
}

main()
