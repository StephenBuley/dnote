#!/usr/bin/env node
import { OptionValues, program } from 'commander'
import path from 'node:path'
import fs from 'node:fs'

program
  .option('-c, --camel-case', 'change words in a filename to camelCase')
  .option('-s, --snake-case', 'change words in a filename to snake_case')
  .option('-k, --kebab-case', 'change words in a filname to kebab-case')
  .option('-w, --spaces', 'separate words in a filename with spaces')
  .argument('<filename>', 'the path to the file name that you want to change')

program.parse()

const options: OptionValues = program.opts()
const filename: string = program.args[0]

if (fs.existsSync(filename)) {
  const ext = path.extname(filename)
  const name = path.parse(filename).name
  const newFilename = transformFileWords(name, options) + ext
  if (fs.existsSync(newFilename)) {
    // ask if we want to overwrite this file
    console.log('Asking if we want to overwrite the file that already exists')
  } else {
    // change the name
    console.log('changing the name of ' + filename + ' to ' + newFilename)
  }
} else {
  console.error('Could not find path to the specified filename, exit process')
}

function transformFileWords(name: string, options: OptionValues): string {
  return 'changedName'
}

// we need to
// 2. see if we can parse the filename into words
//    a. this could be based on spaces "Quick Notes.md"
//    b. this could be based on kebab-case "Quick-Notes.md"
//    c. this could be based on camelCase "quickNotes.md"
//    c.5. this could be based on CamelCase "QuickNotes.md"
//    d. this could be based on snake-case "quick_notes.md"
//    e. this could be based on a combination "these-are_my quickNotes.md"
// 3. once we've parsed into words, join in the correct fashion and add the extension back on
// 4. check to make sure there isn't already a file at that path name
// 5. if there is, ask the user if we want to overwrite the file
// 6 if there isn't, just change the name of the file
