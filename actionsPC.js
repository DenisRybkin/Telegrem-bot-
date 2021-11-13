var exec = require('child_process').exec;
const {exit} = require('process');

module.exports = {
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