
import expandPath from "../lib/rx-path-expander";
import {IRateGovernorInfo} from "rx-rate-governor"

var start = new Date().getTime();

function handleComplete(){
    const elapsed = Math.round((new Date().getTime() - start)/1000);
    console.log(`Complete in ${elapsed} seconds`);
}

expandPath(["\\\\Imola\\TrackDays"])
    //.do(result => console.log(`Result: ${result}`))
    .count()
    .subscribe(
        item => console.log(`result: ${item}`),
        error => console.log(`error: ${error}`),
        () => handleComplete()
        );