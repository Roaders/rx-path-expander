
import fs = require('fs');
import path = require('path');
import Rx = require('rx');

import {RateGovernor, IRateGovernorInfo} from "rx-rate-governor"

export interface IFileStats extends fs.Stats{
    filePath: string;
}

export default function expandPath(
    basePath: string | string[],
    filter?: (fileStats: IFileStats) => boolean,
    progressCallback?: (progress: IRateGovernorInfo) => void
    ): Rx.Observable<string>{
    const pathArray: string[] = Array.isArray(basePath) ? basePath : [basePath];

    const pathSubject = new Rx.Subject<string>();

    const pathSource = pathSubject
        .merge(Rx.Observable.from<string>(pathArray));

    const governor = new RateGovernor<string>(pathSource);

    return governor.observable
        .flatMap(folderPath => loadFolderContents(folderPath))
        .do(() => governor.governRate())
        .flatMap(folderList => Rx.Observable.from(folderList))
        .flatMap(path => loadPathStat(path))
        .do(stats => addNewPaths(stats, pathSubject))
        .map(stats => stats.filePath);
}


function addNewPaths(pathStats: IFileStats, subject: Rx.Subject<string>){
    if(pathStats.isDirectory){
        console.log(`Adding path: ${pathStats.filePath}`);
        subject.onNext(pathStats.filePath);
    }
}

function loadPathStat(path: string): Rx.Observable<IFileStats>{
    const statObservable = Rx.Observable.fromNodeCallback<fs.Stats>( fs.stat )
    console.log(`loading path stats: ${path}`)

    return statObservable(path)
        .catch(() => Rx.Observable.empty())
        .do(() => console.log(`loading path stats: ${path} COMPLETE`))
        .map(stats => {
            const fileInfo = stats as IFileStats;
            fileInfo.filePath = path;

            return fileInfo;
        })
}

function loadFolderContents(folder: string): Rx.Observable<string[]>{
    console.log(`loading path content: ${folder}`)
    const readDirObservable = Rx.Observable.fromNodeCallback<string[]>( fs.readdir )

    return readDirObservable(folder)
        .catch(() => Rx.Observable.empty())
        .do(() => console.log(`loading path content: ${folder} COMPLETE`))
        .map(folderContents => folderContents.map( filepath => path.join(folder, filepath)));
}