const ValuesCtrl = require('../controllers/values_controller');
var path = require('path');

module.exports = function (app) {
    app
     .get('/', (req, res) => res.sendFile(path.join(__dirname + '../../index.html')) )
     .get('/test/:id', ValuesCtrl.readValue)
     .get('/tests', ValuesCtrl.readValues)
     .post('/test', ValuesCtrl.createValue)
     .post('/tests', ValuesCtrl.createValues)
     .put('/test', ValuesCtrl.updateValue)
     .delete('/test/:id', ValuesCtrl.deleteValue)
};
