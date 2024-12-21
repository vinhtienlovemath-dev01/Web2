var Router = require('restify-router').Router;
const router = new Router();
var {getPgClient} = require('../models/db');
var format = require('pg-format');
var {authenticated} = require('../middleware/authenticate'); 
const Room = require('../models/room');
const {authorized} = require('../middleware/authorize');
const {validated} = require('../middleware/validated')

router.get('/room', async (req, res) => {
    const result = await Room.all();
    res.send( {
        rooms: result
    });
});

router.get('/room/:id', [validated], async (req, res) => {
    const id = req.params.id;
    
    const {found, data} = await Room.byId(id);

    if (found) {
        res.send({
            success: true, code: 200, message: "",
            data: data
        });
    } else {
        res.send({
            success: false, code: 404,
            message: "Cannot find room with id: " + id
        });
    }   
});

router.post('/room', [authenticated, authorized, validated], async (req, res) => {
    var {name = "", price = 0} = req.params;
    const found = await Room.create(name, price);
    // TODO: Check valid params
    if (found) {
        res.send({
            success: true, code: 200,
            message: "Room added successfully",
            info: req.user
        });        
    } else {
        res.send({
            success: false, code: 403,
            message: "Invalid parameters"
        }); return;
    } return;
});

router.del('/room/:id', [authenticated, authorized, validated], async(req, res) => {
    // TODO: refactorize
    var id = req.params.id;
    const found = await Room.deleteByID(id);
    
    if (found) {
        res.send({
            success: true, code: 200, message: ""
        });
    } else {
        res.send({
            success: false, code: 404, message: "Cannot delete room with id " + id + ". Does not exist."
        });
    } return;
});

router.patch('/room/:id', [authenticated, authorized, validated], async(req, res) => { 
    const {id} = req.params;
    const result = await Room.updateById(id, req);
    res.send(result); 
});

module.exports = router;