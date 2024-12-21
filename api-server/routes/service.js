const Router = require('restify-router').Router;
const router = new Router();
const {authenticated} = require('../middleware/authenticate');
const {authorized} = require('../middleware/authorize');
const {validated} = require('../middleware/validated');

const Service = require('../models/service');

router.get('/service', [authenticated, authorized], async (req, res) => {
    const result = await Service.getAll(req);
    res.send({
        success: true, code: 200, 
        data: result
    });
});

router.get('/service/:id', [authenticated, authorized], async (req, res) => {
    const {id} = req.params;
    const result = await Service.getByID(req, id);
    res.send(result);
});

router.post('/service', [authenticated, authorized], async (req, res) => {
    const {service_name, service_price} = req.params;
    const result = await Service.create(service_name, service_price);
    res.send(result);
    // res.send({
    //     success: true, code: 200, 
    //     data: result
    // });  
});


router.del('/service/:id', [authenticated, authorized], async (req, res) => {
    const {id} = req.params;
    const context = req.user;
    const del = req.params;

    const result = await Service.deleteByID(context, id, del);
    res.send(result);
});


router.patch('/service/:id', [authenticated, authorized], async (req, res) => {
    const {id} = req.params;
    const context = req.user;
    const patch = req.params;

    const result = await Service.updateByID(context, id, patch);
    res.send(result);
});

// router.patch('/customer/:username/service/:service_id/detail/:detail_id', [authenticated, authorized], async (req, res) => {
//     const {username, service_id, detail_id} = req.params;
//     const context = req.user;
//     const patch = req.params;

//     const result = await service.updateDetail(context, username, service_id, detail_id, patch);
//     res.send(result);
// });

// router.del('/service/:id', [authenticated, authorized], async (req, res) => {
//     const {id} = req.params;
//     const context = req.user;
//     const del = req.params;

//     const result = await service.deleteByID(context, id, del);
//     res.send(result);
// });

// router.del('/detail/:id', [authenticated, authorized], async (req, res) => {
//     const {id} = req.params;
//     const context = req.user;
//     const del = req.params;

//     const result = await service.deleteDetailByID(context, id, del);
//     res.send(result);
// });


// router.post('/service', [authenticated, authorized], async (req, res) => {
//     const {fullname, email, tel, address} = req.params;
//     const result = await service.create(fullname, email, tel, address);
//     res.send({
//         success: true, code: 200, 
//         data: result
//     });  
// });

// router.get('/service', [authenticated, authorized], async (req, res) => {
//     const result = await service.getAll(req);
//     res.send({
//         success: true, code: 200, 
//         data: result
//     });
// });

// router.get('/service/:id', [authenticated, authorized], async (req, res) => {
//     const {id} = req.params;
    
//     const result = await service.getByID(req, id);
//     res.send(result);
// });

// router.patch('/service/:id', [authenticated, authorized], async (req, res) => {
//     const {id} = req.params;
//     const context = req.user;
//     const patch = req.params;

//     const result = await service.updateByID(context, id, patch);
//     res.send(result);
// });

// router.del('/service/:id', [authenticated, authorized], async (req, res) => {
//     const {id} = req.params;
//     const context = req.user;
//     const del = req.params;

//     const result = await service.deleteByID(context, id, del);
//     res.send(result);
// });

module.exports = router;