var cluster = require('cluster');
var Manage = require('./manage').Manage;
var logger = require('nlogger').logger('runer.js');

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < 5; i++) {
        cluster.fork();
    }
    cluster.on('death', function (worker) {
        'use strict';
        logger.log('worker ' + worker.pid + ' died', 'restart...');
        cluster.fork();
    });

}
else {
    // Worker processes have a http server.
    var manage = new Manage();
    manage.runServer();
}
