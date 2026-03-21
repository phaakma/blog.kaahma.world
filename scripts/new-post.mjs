import { mkdirSync, existsSync, writeFileSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { createInterface } from 'readline/promises'

const BLOG_ROOT = path.join(process.cwd(), 'data', 'blog')
const ALLOWED_LAYOUTS = ['PostLayout', 'PostSimple', 'PostBanner']
const DEFAULT_LAYOUT = 'PostSimple'

function yamlQuote(value) {
  return `'${String(value).replace(/'/g, "''")}'`
}

function normalizeFolder(folderInput) {
  const cleaned = folderInput.trim().replace(/\\/g, '/').replace(/^\/+|\/+$/g, '')
  if (!cleaned) {
    return ''
  }

  const segments = cleaned.split('/').filter(Boolean)
  if (segments.some((segment) => segment === '.' || segment === '..')) {
    throw new Error('Folder cannot contain "." or ".." segments.')
  }

  return segments.join('/')
}

function parseTags(input) {
  if (!input.trim()) {
    return []
  }

  return input
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function formatTags(tags) {
  if (tags.length === 0) {
    return '[]'
  }

  return `[${tags.map((tag) => yamlQuote(tag)).join(', ')}]`
}

function toIsoDateOnly(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

async function main() {
  const rl = createInterface({ input: process.stdin, output: process.stdout })

  try {
    console.log('Create a new blog post')
    console.log('----------------------')

    let title = ''
    while (!title) {
      title = (await rl.question('Post title: ')).trim()
      if (!title) {
        console.log('Title is required.')
      }
    }

    const suggestedSlug = slug(title)
    const slugInput = (await rl.question(`Post filename slug [${suggestedSlug}]: `)).trim()
    const fileSlug = slugInput ? slug(slugInput) : suggestedSlug

    if (!fileSlug) {
      throw new Error('Could not build a valid slug from your input.')
    }

    const folderInput = await rl.question('Nested folder under data/blog (blank for root): ')
    const folder = normalizeFolder(folderInput)

    let layoutInput = (
      await rl.question(
        `Layout (${ALLOWED_LAYOUTS.join(', ')}) [${DEFAULT_LAYOUT}]: `
      )
    ).trim()
    if (!layoutInput) {
      layoutInput = DEFAULT_LAYOUT
    }
    if (!ALLOWED_LAYOUTS.includes(layoutInput)) {
      throw new Error(`Invalid layout: "${layoutInput}".`)
    }

    const summary = (await rl.question('Summary (optional): ')).trim()
    const tagsInput = await rl.question('Tags (comma-separated, optional): ')
    const tags = parseTags(tagsInput)

    const targetDir = folder ? path.join(BLOG_ROOT, folder) : BLOG_ROOT
    const targetFilePath = path.join(targetDir, `${fileSlug}.mdx`)

    if (existsSync(targetFilePath)) {
      throw new Error(`File already exists: ${targetFilePath}`)
    }

    mkdirSync(targetDir, { recursive: true })

    const now = toIsoDateOnly()
    const frontmatter = [
      '---',
      `title: ${yamlQuote(title)}`,
      `date: ${yamlQuote(now)}`,
      `tags: ${formatTags(tags)}`,
      'draft: true',
      `summary: ${yamlQuote(summary)}`,
      `layout: ${layoutInput}`,
      '---',
      '',
      `## ${title}`,
      '',
      'Write your post here.',
      '',
      '![Example image](/static/images/logo.png)',
      '',
    ].join('\n')

    writeFileSync(targetFilePath, frontmatter, 'utf8')

    const relativeTarget = path.relative(process.cwd(), targetFilePath).replace(/\\/g, '/')
    console.log(`Created: ${relativeTarget}`)
    console.log('Tip: run your dev server and open the file in VS Code to start writing.')
  } finally {
    rl.close()
  }
}

main().catch((error) => {
  console.error(`Error: ${error.message}`)
  process.exitCode = 1
})
