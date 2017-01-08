
import expandPath from "../lib/rx-path-expander";
import {IRateGovernorInfo} from "rx-rate-governor"

expandPath(["c:"])
    .subscribe(
        item => console.log(`result: ${item}`),
        error => console.log(`error: ${error}`),
        () => console.log(`Complete`)
        );