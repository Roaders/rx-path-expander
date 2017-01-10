# rx-path-expander

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
