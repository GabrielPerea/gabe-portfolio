// Prerender: inject server-rendered HTML into dist/index.html so the
// deployed page contains real content for crawlers, LLMs, and unfurlers.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const { render } = await import(resolve(root, 'dist-ssr/ssr-entry.js'))

const html = render()
const indexPath = resolve(root, 'dist/index.html')
const template = readFileSync(indexPath, 'utf8')

const marker = '<div id="root"></div>'
if (!template.includes(marker)) {
  throw new Error('prerender: could not find root div in dist/index.html')
}
writeFileSync(indexPath, template.replace(marker, `<div id="root">${html}</div>`))
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerender: injected ${(html.length / 1024).toFixed(0)}KB of HTML into dist/index.html`)
