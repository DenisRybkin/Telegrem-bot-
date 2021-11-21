import {Service} from 'node-windows';

const svc = new Service({
    name : "PC shutdown bot",
    description : "this bot started with help pm2",
    script : "C:\\Users\\Андрей\\WebstormProjects\\telegram-bot-shutdown\\index.js"
});

svc.on('install', function(){
    svc.start();
})

svc.install();