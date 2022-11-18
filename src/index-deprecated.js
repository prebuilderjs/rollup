

/*

This method consisted in using rollup's watch event, to implement automatic resolve/restore when using rollup in watch mode
this has been deprecated because upon watch.onEnd event's execution of restore, files are changed causing a resolve/restore loop,

TLDR: this method is simpler but useless in watch mode


import { wrap } from 'prebuilder/src/preprocess.js';
import { LogError, LogColor, LogWarn } from 'prebuilder/src/logger.js';
import { parseArgs } from 'prebuilder/src/arg-manager.js';
import { getConfigOptions } from 'prebuilder/src/config-manager.js';
// import paramDefinitions from 'prebuilder/src/command-definitions';

global.temp_folder = ".prebuilder-storage";
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


let cmd = `rollup ${rollupArgs.join(' ')}`;

// watch mode
if (processInstructions.args.some(arg => ['-w', '-watch'].includes(arg))) {

    LogColor("pb-rollup in watch mode\n", 'cyan');

    // cmd += ' --watch.onBundleStart \"prebuilder resolve ' + (!!processInstructions.params.config ? '-c ' + processInstructions.params.config : '') + '\"';
    cmd += ' --watch.onStart \"prebuild resolve ' + (!!processInstructions.params.config ? '-c ' + processInstructions.params.config : '') + '\"';
    cmd += ' --watch.onEnd \"prebuild restore\"';
    cmd += ' --watch.onError \"prebuild restore\"';
    cmd += ' --watch.onBundleEnd \"prebuild restore\"';
}

wrap(cmd, prebuilderOptions)
    .then().catch(err => console.error(err));




// -------------------------------------------------------------------------------------

function extractRollupArgs() {

    let rollupArgs = processInstructions.args.filter(arg => {
        // remove any prebuilder parameter & its value
        let isprebuilderParam = paramDefinitions.some(def => def.param == arg) || paramDefinitions.some(def => def.alias == arg)
        let isprebuilderParamValue = Object.values(processInstructions.params).includes(arg)
        return !isprebuilderParam && !isprebuilderParamValue;
    });

    // check config is last to avoid shady error
    rollupArgs.map((arg, i) => {
        if ((arg == '-c' || arg == '--config') && i < rollupArgs.length - 2) {
            LogError("pb-rollup error: rollup config parameter ('-c' & '--config') must be the last arguments.")
        }
    });

    return rollupArgs;
}

*/