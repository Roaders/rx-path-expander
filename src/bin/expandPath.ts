#!/usr/bin/env node

import {OptionDefinition} from "command-line-args";
import * as commandLineArgs from "command-line-args"
import * as commandLineUsage from "command-line-usage";
import * as filesize from "filesize"
import expandPath, {IFileStats} from "../lib/rx-path-expander";


const argumentDefinitions: OptionDefinition[] = [
    {
        name: "path", 
        description: "Required. Path to expand. Can be absolute or relative",
        alias: "p", 
        type: String, 
        multiple: true
    },
    {
        name: "excludeDirectories", 
        description: "Does not include directories in output",
        type: Boolean, 
        defaultValue: false
    },
    {
        name: "excludeFiles", 
        description: "Does not include files in output",
        type: Boolean, 
        defaultValue: false
    },
    {
        name: "filterString", 
        description: "A regular expression determining which paths to include in output",
        type: String
    },
    {
        name: "help", 
        description: "Displays this help text",
        alias: "h", 
        type: Boolean
    }
];

const sections = [
    {
        header: "Expand path",
        content: "Library for expanding a path to return all sub-directories and files"
    },
    {
        header: "Options",
        optionList: argumentDefinitions
    }
];

const {path, excludeDirectories, excludeFiles, filterString, help}: {path: string[], excludeDirectories: boolean, excludeFiles: boolean, filterString: string, help: boolean} = commandLineArgs(argumentDefinitions);

if(help){
    console.log(commandLineUsage(sections));
    process.exit(0);
}

if(!path || path.length === 0){
    console.log(`specify paths to expand with '-p myAbsoluteOrRelativePath --path anotherPath'. For help use -h.`);
    process.exit(1);
}

const filterRegExp = filterString? new RegExp(filterString) : null;

function filter(stats: IFileStats):boolean{
    if(excludeFiles && stats.isFile()){
        return false;
    }
    if(excludeDirectories && stats.isDirectory()){
        return false;
    }

    return filterRegExp ? filterRegExp.test(stats.filePath) : true;
}

expandPath(path, filter)
    .scan((acc, stats) => {
        acc.count++;
        acc.totalSize += stats.size;
        acc.currentPath = stats.filePath;

        return acc;
    }, {count: 0, totalSize: 0, currentPath: ""})
    .do(acc => console.log(`${acc.currentPath} (${acc.count} files ${filesize(acc.totalSize)})`))
    .last()
    .subscribe(
        acc => console.log(`${acc.count} paths ${filesize(acc.totalSize)}`),
        error => console.log(`Error: ${error}`),
        () => console.log(`Complete`)
    );