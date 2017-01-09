"use strict";
var commandLineArgs = require("command-line-args");
var rx_path_expander_1 = require("../lib/rx-path-expander");
var argumentDefinitions = [
    { name: "path", alias: "p", type: String, multiple: true },
    { name: "includeDirectories", type: Boolean, defaultValue: true },
    { name: "includeFiles", type: Boolean, defaultValue: true },
    { name: "filterString", type: String }
];
var _a = commandLineArgs(argumentDefinitions), path = _a.path, includeDirectories = _a.includeDirectories, includeFiles = _a.includeFiles, filterString = _a.filterString;
var filterRegExp = filterString ? new RegExp(filterString) : null;
console.log("regexp: " + filterRegExp);
function filter(stats) {
    return filterRegExp ? filterRegExp.test(stats.filePath) : true;
}
rx_path_expander_1.default(path, filter)
    .do(function (path) { return console.log(path); })
    .count()
    .subscribe(function (count) { return console.log(count + " paths"); }, function (error) { return console.log("Error: " + error); }, function () { return console.log("Complete"); });
//# sourceMappingURL=expandPath.js.map