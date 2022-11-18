import { wrap } from 'prebuilder/src/preprocess.js';
import { LogError, LogColor, LogWarn } from 'prebuilder/src/logger.js';
import { parseArgs } from 'prebuilder/src/arg-manager.js';
import { getConfigOptions } from 'prebuilder/src/config-manager.js';
const { Confirm } = require('enquirer');
const path = require('path');

global.temp_folder = ".prebuilder-storage";
let outputPath = path.join(temp_folder, "pb-rollup/output").replaceAll('\\', '/');
const paramDefinitions = [
    {
        param: '--pb-config',
        alias: '-pbc',
        objectPath: 'config',
        needsValue: true,
    },
]

// treatment of args into -> args, command, prebuilderParams
let processInstructions = parseArgs(paramDefinitions);
// extract prebuilder options from config file & params
let prebuilderOptions = getConfigOptions(processInstructions.params);
// extract rollup args
let rollupArgs = extractRollupArgs();

// logging
// console.log(processInstructions);
// console.log(prebuilderOptions);
// console.log(rollupArgs);


(async function execution() {
    // detect watch mode
    if (processInstructions.args.some(arg => ['-w', '-watch'].includes(arg))) {

        LogColor("pb-rollup:\n", 'cyan');

        // onTheSpot mode unavailable in watch mode
        if (prebuilderOptions.onTheSpot) {
            LogColor("pb-rollup does not support --onTheSpot feature while in watch mode\n", 'yellow');
            try {
                await new Confirm({name: "onTheSpot feature question", message:"Ignore feature and continue?"}).run()
                    .then(answer => {
                        if (answer == false) {
                            console.log("responded no");
                            throw 'User refused to proceed';
                        }
                        console.log("responded yes");
                    });
            } catch {
                return;
            }
            prebuilderOptions.onTheSpot = false;
        }

        if (prebuilderOptions.onTheSpot) {
            /*

            This method consisted in using rollup's watch events, to implement automatic resolve/restore
            this has been abandoned because upon watch.onEnd event's execution of restore,
            copy back of files to the source folder cause a resolve/restore loop,

            TLDR: this method is simpler but useless in watch mode


            process.env.__prebuilderOutput = prebuilderOptions.scrDir;
            // watch mode
            if (processInstructions.args.some(arg => ['-w', '-watch'].includes(arg))) {

                // rollupArgs.push(' --watch.onBundleStart \"prebuilder resolve ' + (!!processInstructions.params.config ? '-c ' + processInstructions.params.config : '') + '\"');
                rollupArgs.push(' --watch.onStart \"prebuild resolve ' + (!!processInstructions.params.config ? '-c ' + processInstructions.params.config : '') + '\"');
                rollupArgs.push(' --watch.onEnd \"prebuild restore\"');
                rollupArgs.push(' --watch.onError \"prebuild restore\"');
                rollupArgs.push(' --watch.onBundleEnd \"prebuild restore\"');
            }

            */
        } else {

            prebuilderOptions.outDir = outputPath;
            // watch output folder
            prebuilderOptions.watch = true;
            // let rollup pick source from output folder & watch it
            process.env.__prebuilderOutput = outputPath;
            // setup rollup to watch concurrently
            prebuilderOptions.wrap_RunCmdFirstTimeOnly = true;
            // rollup watch mode will take on execution, so run in another process
            prebuilderOptions.wrap_RunCmdInParallel = true;
        }

        // prebuild
        let cmd = `rollup ${rollupArgs.join(' ')}`;

        wrap(cmd, prebuilderOptions)
            .then().catch(err => console.error(err));

    } else {

        if (prebuilderOptions.onTheSpot) {
            process.env.__prebuilderOutput = prebuilderOptions.srcDir;

        } else {
            prebuilderOptions.outDir = outputPath;
            // give output to rollup as source
            process.env.__prebuilderOutput = outputPath;
        }

        // prebuild
        let cmd = `rollup ${rollupArgs.join(' ')}`;

        wrap(cmd, prebuilderOptions)
            .then().catch(err => console.error(err));
    }
})();



// -------------------------------------------------------------------------------------

function extractRollupArgs() {

    let rollupArgs = processInstructions.args.filter(arg => {
        // remove any prebuilder parameter & its value
        let isprebuilderParam = paramDefinitions.some(def => def.param == arg) || paramDefinitions.some(def => def.alias == arg)
        let isprebuilderParamValue = Object.values(processInstructions.params).includes(arg)
        return !isprebuilderParam && !isprebuilderParamValue;
    });

    // check config is last arg to avoid shady error
    // rollupArgs.map((arg, i) => {
    //     if ((arg == '-c' || arg == '--config') && i < rollupArgs.length - 2) {
    //         LogError("pb-rollup error: rollup config parameter ('-c' & '--config') must be the last argument.")
    //     }
    // });

    return rollupArgs;
}