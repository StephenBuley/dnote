#!/usr/bin/env node
import { OptionValues, program } from 'commander'
import path from 'node:path'

program
  .option('-c, --camel-case', 'change words in a filename to camelCase')
  .option('-s, --snake-case', 'change words in a filename to snake_case')
  .option('-k, --kebab-case', 'change words in a filname to kebab-case')
  .argument('<filename>', 'the path to the file name that you want to change')

program.parse()

const options: OptionValues = program.opts()
const filename: string = program.args[0]

console.log('hello from node')
console.dir(options)
console.log(path.relative('.', program.args[0]))
