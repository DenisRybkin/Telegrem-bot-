import {exec} from 'child_process';
import {exit} from "process";

export const actionsPC = {
    shutdown : () => {
        exec('shutdown.exe -s -t 00', function () {
            console.log('shutdown.exe -s -t 00');
            exit(-1);
        });
    },
    reboot : () => {
        exec('shutdown.exe -r -t 10', function () {
            console.log('shutdown.exe -s -t 00');
            exit(-1);
        });
    },
    sleepMod : () => {
        exec('rundll32 powrprof.dll,SetSuspendState', function () {
            console.log('shutdown.exe -s -t 00')
        });
    },
}