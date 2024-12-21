const Router = require('restify-router').Router;
const router = new Router();
const {authenticated} = require('../middleware/authenticate');
const {authorized} = require('../middleware/authorize');
const {validated} = require('../middleware/validated');

const Customer = require('../models/customer');

router.post('/customer', async (req, res) => {
    const {username, password} = req.params;
    const result = await Customer.create(username, password);
    res.send({
        success: true, code: 200, 
        data: result
    });  
});

router.get('/customer', [authenticated, authorized], async (req, res) => {
    const result = await Customer.getAll(req);
    res.send({
        success: true, code: 200, 
        data: result
    });
});

router.get('/customer/:username', [authenticated, authorized], async (req, res) => {
    const {username} = req.params;
    
    const result = await Customer.getByID(req, username);
    res.send(result);
});

router.patch('/customer/:username', [authenticated, authorized], async (req, res) => {
    const {username} = req.params;
    const context = req.user;
    const patch = req.params;

    const result = await Customer.updateByID(context, username, patch);
    res.send(result);
});

router.del('/customer/:username', [authenticated, authorized], async (req, res) => {
    const {username} = req.params;
    const context = req.user;
    const del = req.params;

    const result = await Customer.deleteByID(context, username, del);
    res.send(result);
});

module.exports = router;