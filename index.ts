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
  const oldPathObj = path.parse(filename)
  const name = oldPathObj.name
  const newFilename = path.format({
    ...oldPathObj,
    base: '',
    name: transformFileWords(name, options),
  })

  if (fs.existsSync(newFilename)) {
    console.error(
      `'${filename}' not renamed: '${newFilename}' already exists.\nIf using the -c option, you may want to use 'mv ${filename} ${newFilename}' instead`,
    )
  } else {
    // change the name
    console.log('changing the name of ' + filename + ' to ' + newFilename)
    fs.renameSync(filename, newFilename)
  }
} else {
  console.error('Could not find path to the specified filename, exit process')
}

function transformFileWords(name: string, options: OptionValues): string {
  const wordsArray = separateIntoWords(name)
  let finalWordsArray: string[] = []
  for (const word of wordsArray) {
    const words = splitCamelCaseWord(word)
    finalWordsArray.push(...words)
  }
  if (options.camelCase) {
    // loop over the words array and make them all camel case equivalent, excluding the first
    finalWordsArray = finalWordsArray.map((word, i) => {
      if (i === 0) return word[0].toLowerCase() + word.slice(1)
      return word[0].toUpperCase() + word.slice(1)
    })
  }
  return finalWordsArray.join(getSeparator(options))
}

function getSeparator(options: OptionValues): string {
  if (options.snakeCase) return '_'
  if (options.kebabCase) return '-'
  if (options.spaces) return ' '
  return '' // figure camelCase out later
}

function separateIntoWords(name: string): string[] {
  const words = name.split(/[ \-_]/)
  return words
}

function isCapitalLetter(char: string): boolean {
  return (
    char !== undefined && char.charCodeAt(0) > 64 && char.charCodeAt(0) < 91
  )
}

function startsNewWord(
  char: string,
  prevChar: string | undefined,
  nextChar: string | undefined,
  isLast: boolean,
): boolean {
  if (isLast) return false
  if (isCapitalLetter(char)) {
    // this line checks for whether or not the capital character is part of a all caps word
    if (
      (prevChar && !isCapitalLetter(prevChar)) ||
      (nextChar && !isCapitalLetter(nextChar))
    ) {
      return true
    }
  }
  return false
}

/**
 *
 * @param {string} word A camelCase word that needs to be split,
 * @returns {string[]} an array of the split words
 * @example
 * const word = "myCamelCaseWord"
 * const readMe = "READMe"
 * const one = "ONEWORD"
 *
 * splitCamelCaseWord(word) // returns ["my", "Camel", "Case", "Word"]
 * splitCamelCaseWord(readMe) // returns ["READ", "Me"]
 * splitCamelCaseWord(one) // returns ["ONEWORD"]
 */
function splitCamelCaseWord(word: string): string[] {
  const words: string[] = []
  // this is to help keep track of the previous characters
  let currentWord = '' + word[0] // just the first letter
  // look through the word
  for (let i = 1; i < word.length; i++) {
    const char = word[i]
    // if we hit a capital letter
    const prevChar = currentWord[currentWord.length - 1]
    const nextChar = word[i + 1]
    const isLast = i === word.length - 1
    if (startsNewWord(char, prevChar, nextChar, isLast)) {
      // add the currentWord to the returned words array
      words.push(currentWord)
      // reset currentWord to nothing
      currentWord = ''
    }
    // always add the current character to the word
    currentWord += char
  }
  // when we get to the end, add the current word
  words.push(currentWord)

  return words
}
