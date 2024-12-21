const Router = require('restify-router').Router;
const router = new Router();
const {authenticated} = require('../middleware/authenticate');
const {authorized} = require('../middleware/authorize');
const {validated} = require('../middleware/validated');

const Employee = require('../models/employee');

router.post('/employee', [authenticated, authorized], async (req, res) => {
    const {fullname, email, tel, address} = req.params;
    const result = await Employee.create(fullname, email, tel, address);
    res.send({
        success: true, code: 200, 
        data: result
    });  
});

router.get('/employee', [authenticated, authorized], async (req, res) => {
    const result = await Employee.getAll(req);
    res.send({
        success: true, code: 200, 
        data: result
    });
});

router.get('/employee/:id', [authenticated, authorized], async (req, res) => {
    const {id} = req.params;
    
    const result = await Employee.getByID(req, id);
    res.send(result);
});

router.patch('/employee/:id', [authenticated, authorized], async (req, res) => {
    const {id} = req.params;
    const context = req.user;
    const patch = req.params;

    const result = await Employee.updateByID(context, id, patch);
    res.send(result);
});

router.del('/employee/:id', [authenticated, authorized], async (req, res) => {
    const {id} = req.params;
    const context = req.user;
    const del = req.params;

    const result = await Employee.deleteByID(context, id, del);
    res.send(result);
});

module.exports = router;