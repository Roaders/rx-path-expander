#! /usr/bin/env node

import * as commandLineArgs from "command-line-args";
import expandPath, {IFileStats} from "../lib/rx-path-expander";

const argumentDefinitions: commandLineArgs.ArgsOptions[] = [
    {name: "path", alias: "p", type: String, multiple: true},
    {name: "includeDirectories", type: Boolean, defaultValue: true},
    {name: "includeFiles", type: Boolean, defaultValue: true},
    {name: "filterString", type: String}
];

const {path, includeDirectories, includeFiles, filterString}: {path: string[], includeDirectories: boolean, includeFiles: boolean, filterString: string} = commandLineArgs(argumentDefinitions);

const filterRegExp = filterString? new RegExp(filterString) : null;

console.log("regexp: " + filterRegExp);

function filter(stats: IFileStats):boolean{
    return filterRegExp ? filterRegExp.test(stats.filePath) : true;
}

expandPath(path, filter)
    .do(path => console.log(path))
    .count()
    .subscribe(
        count => console.log(`${count} paths`),
        error => console.log(`Error: ${error}`),
        () => console.log(`Complete`)
    );