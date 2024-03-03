#!/usr/bin/env node
import { program } from 'commander'

program
  .option('-c, --camel-case', 'change words in a filename to camelCase')
  .option('-s, --snake-case', 'change words in a filename to snake_case')
  .option('-k, --kebab-case', 'change words in a filname to kebab-case')
  .argument('<filename>', 'the path to the file name that you want to change')

program.parse()

const options = program.opts()

console.log('hello from node')
console.dir(options)
