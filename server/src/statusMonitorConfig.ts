import { StatusMonitorConfiguration } from 'nest-status-monitor';

export const statusMonitorConfig: StatusMonitorConfiguration = {
    pageTitle: 'Nest.js Status Monitor',
    path : '/status',
    spans : [{
        interval: 1,            // Every second
        retention: 60,           // Keep 60 datapoints in memory
    }, {
        interval: 5,            // Every 5 seconds
        retention: 60,
    }, {
        interval: 15,           // Every 15 seconds
        retention: 60,
    }],
    chartVisibility : {
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
    },
    healthChecks : [],
    ignoreStartsWith : '/admin',
    port: 3000,
};
