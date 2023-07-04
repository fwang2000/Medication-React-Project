const verifyToken = require('../middleware/authJwt');
const dripController = require('../controllers/dripController');

const dripRoutes = (app) => {
    
    app.get('/drip-orders', dripController.getDripOrders);

    app.post('/drip-orders', verifyToken, dripController.addDripOrder);

    app.put('/drip-orders/:id', verifyToken, dripController.updateDripOrder);
    
    app.delete('/drip-orders/:id', verifyToken, dripController.deleteDripOrder);
};

module.exports = dripRoutes;