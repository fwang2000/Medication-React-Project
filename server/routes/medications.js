const medicationController = require('../controllers/medicationController');

const medicationRoutes = (app) => {

    app.get('/medications', medicationController.getMedication);

    app.post('/medications', verifyToken, medicationController.addMedication);

    app.put('/medications/:index', verifyToken, medicationController.updateMedication);

    app.delete('/medications/:index', verifyToken, );
};

module.exports = medicationRoutes;