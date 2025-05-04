const {createServer} = require('@lhci/server');

console.log('Starting server...');
createServer({
  port: 3000,
  storage: {
    storageMethod: 'sql',
    sqlDialect: 'postgres',
    sqlConnectionUrl: process.env.svc.sel4.cloudtype.app:31828
  },  
}).then(({port}) => console.log('LHCI listening on port', port));
