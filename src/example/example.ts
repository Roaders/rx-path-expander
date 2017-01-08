
import expandPath from "../lib/rx-path-expander";
import {IRateGovernorInfo} from "rx-rate-governor"

function logProgress(info: IRateGovernorInfo){
    //console.log(`complete: ${info.complete}/${info.total} inProgress: ${info.inProgress} concurrent: ${info.concurrentCount}`);
}

expandPath(["\\\\imola\\TrackDays\\Days\\Eastern Europe 2016"], undefined, logProgress)
    .do(path => console.log(path))
    .count()
    .subscribe(
        item => console.log(`result: ${item}`),
        error => console.log(`error: ${error}`),
        () => console.log(`Complete`)
        );