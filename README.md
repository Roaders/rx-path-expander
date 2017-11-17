[![Known Vulnerabilities](https://snyk.io/test/github/roaders/rx-path-expander/badge.svg)](https://snyk.io/test/github/roaders/rx-path-expander)

# rx-path-expander

[![Greenkeeper badge](https://badges.greenkeeper.io/Roaders/rx-path-expander.svg)](https://greenkeeper.io/)

Library for expanding a path to return all sub-directories and files

## Usage

### From Command Line

You can use `path-extender` from the command line but installing as a global package:

`npm install -g rx-path-expander`

You can then list all files in a relative:

`expandPath --path node_modules --filterString ".js"`

to show all `js` files in the `node_modules` folder

`expandPath -p E:\ -p C:\`

to list all folders in the `C:` and `E:` drives.

Use `expandPath -h` for a full list of options

#### Example Output

```
roaders@localhost:~/dev/rx-path-expander$ expandPath -p src
/home/roaders/dev/rx-path-expander/src/bin
/home/roaders/dev/rx-path-expander/src/example
/home/roaders/dev/rx-path-expander/src/index.ts
/home/roaders/dev/rx-path-expander/src/lib
/home/roaders/dev/rx-path-expander/src/bin/expandPath.ts
/home/roaders/dev/rx-path-expander/src/example/example.ts
/home/roaders/dev/rx-path-expander/src/lib/rx-path-expander.ts
7 paths
Complete

```

### In Node Project

You can use path extender in a node project to expand paths:

`npm install --save rx-path-expander`

In your code:

```
var expandPath, {IIFileStats} = require("../lib/rx-path-expander");
var {IRateGovernorInfo} = require("rx-rate-governor");

function handleProgress(progressInfo: {readDirProgress: IRateGovernorInfo, readStatsProgress: IRateGovernorInfo}){
    //display progress
}

filterFunction(stats: IIFileStats): boolean{
    return stats.isFile() && stats.filePath.indexOf("jpg") > 0;
}

expandPath(["pathOne","pathTwo"],filterFunction,handleProgress)
    .subscribe(path => doSomethingWithPath());

```

## Example
An example can be run as follows:

```
git clone https://github.com/Roaders/rx-path-expander.git
cd rx-path-expander
npm install
npm run example
```
