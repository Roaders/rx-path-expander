
import expandPath, {IFileStats} from "../lib/rx-path-expander";
import {IRateGovernorInfo} from "rx-rate-governor"

var start = new Date().getTime();

function handleProgress({readDirProgress, readStatsProgress}: {readDirProgress: IRateGovernorInfo, readStatsProgress: IRateGovernorInfo}){
    //console.log(`Path ${readDirProgress.complete}/${readDirProgress.total} inProgress: ${readDirProgress.inProgress} concurrent: ${readDirProgress.concurrentCount}; Stats ${readStatsProgress.complete}/${readStatsProgress.total} inProgress: ${readStatsProgress.inProgress} concurrent: ${readStatsProgress.concurrentCount}`);
}

function handleComplete(){
    const elapsed = Math.round((new Date().getTime() - start)/1000);
    console.log(`Complete in ${elapsed} seconds`);
}

function filterPaths(stats: IFileStats): boolean{
    return stats.filePath.indexOf("misc") > 0;
}

//const sourcePath = "\\\\Imola\\TrackDays\\Days\\Eastern Europe 2016"
const sourcePath = "C:\\";

console.log(`Expanding ${sourcePath}`);

expandPath([sourcePath], undefined, handleProgress)
    .do(result => console.log(`Result: ${result}`))
    .count()
    .subscribe(
        item => console.log(`result: ${item}`),
        error => console.log(`error: ${error}`),
        () => handleComplete()
        );