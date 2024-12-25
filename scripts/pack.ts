import type PkgType from '../package.json'
import archiver from 'archiver'
import fs from 'fs-extra'
import { log, r } from './utils'

packExtension()

async function packExtension() {
  log('PACK', `Start`)

  await fs.ensureDir(r('pack'))
  const { version } = (await fs.readJSON(r('package.json'))) as typeof PkgType

  await zip({
    source: 'extension',
    output: `pack/NWT_${version}.zip`,
    isDir: true,
  })
  await zip({
    source: '**/*',
    ignore: ['node_modules/**/*', 'pack/**/*', '.git/**/*'],
    output: `pack/NWT_${version}_Source.zip`,
  })

  log('PACK', `Done`)
}

function zip(options: {
  source: string
  ignore?: string | string[]
  output: string
  isDir?: boolean
}) {
  const { source, isDir, ignore, output } = options

  const archive = archiver('zip', { zlib: { level: 9 } })
  const stream = fs.createWriteStream(output)

  return new Promise<void>((resolve, reject) => {
    let zipper: archiver.Archiver

    if (isDir) {
      zipper = archive.directory(source, false)
    }
    else {
      zipper = archive.glob(source, { ignore, dot: true })
    }

    zipper
      .on('warning', (err) => {
        if (err.code === 'ENOENT') {
          log('PACK', err.message)
        }
        else {
          reject(err)
        }
      })
      .on('error', err => reject(err))
      .pipe(stream)

    stream.on('close', () => {
      log('PACK', `${source} --> ${output}`)
      resolve()
    })

    archive.finalize()
  })
}
