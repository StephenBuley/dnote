# renom

Utility CLI tool to quickly rename folders and files based on conventions.

## Installation

Install the CLI package globally on your system with npm.

```bash
$ npm install -g renom
```

## Usage

```bash
$ renom 'my file_name.txt' # myfilename.txt
$ renom -c 'My File Name.txt' # myFileName.txt
$ renom -k 'My File Name.txt' # My-File-Name.txt
$ renom -s 'My File Name.txt' # My_File_Name.txt
$ renom -w 'My_File_Name.txt' # My File Name.txt
$ renom -h # prints help screen
```

### Options

Use without an option to smash all of the words together, or denote separate words using one of the following options. <br>
Multiple options are not recommended and may have unexpected results.

#### -c, --camel-case

Changes the file name to camelCase, lowercase first letter, and every subsequent word has a capitalized first letter.<br>
Conflicts with other file names that are all one word:

```bash
$ renom -c my-file-name # myFileName
$ renom -c MyFileName # cannot rename MyFileName to myFileName, use mv MyFileName myFileName instead
```

#### -k, --kebab-case

Changes the file name to kebab-case, putting a dash between each word.

```bash
$ renom -k myFileName # my-File-Name
```

#### -s, --snake-case

Changes the file name to snake-case, putting an underscore between each word.

```bash
$ renom -s myFileName # my_File_Name
```

#### -w, --spaces

Changes the file name to whitespace separated, putting a space between each word.

```bash
$ renom -w myFileName # 'my File Name'
```

#### -h, --help

Prints these options in a commander.js generated help screen.
