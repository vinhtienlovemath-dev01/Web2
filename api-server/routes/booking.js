const Router = require('restify-router').Router;
const router = new Router();
const {authenticated} = require('../middleware/authenticate');
const {authorized} = require('../middleware/authorize');
const {validated} = require('../middleware/validated');

const Booking = require('../models/booking');

router.get('/customer/:username/booking', [authenticated, authorized], async (req, res) => {
    const {username} = req.params;
    const result = await Booking.getByCustomer(req, username);
    res.send(result);
});

router.get('/booking/:id', [authenticated, authorized], async (req, res) => {
    const {id} = req.params;
    const result = await Booking.getByID(req, id);
    res.send(result);
});

router.post('/booking', [authenticated, authorized], async (req, res) => {
    const {username, booking_date, checkin_date, checkout_date, total_price} = req.params;
    const result = await Booking.create(username, booking_date, checkin_date, checkout_date, total_price);
    res.send({
        success: true, code: 200, 
        data: result
    });  
});

router.patch('/booking/:id', [authenticated, authorized], async (req, res) => {
    const {id} = req.params;
    const context = req.user;
    const patch = req.params;

    const result = await Booking.updateByID(context, id, patch);
    res.send(result);
});

router.patch('/customer/:username/booking/:booking_id/detail/:detail_id', [authenticated, authorized], async (req, res) => {
    const {username, booking_id, detail_id} = req.params;
    const context = req.user;
    const patch = req.params;

    const result = await Booking.updateDetail(context, username, booking_id, detail_id, patch);
    res.send(result);
});

router.del('/booking/:id', [authenticated, authorized], async (req, res) => {
    const {id} = req.params;
    const context = req.user;
    const del = req.params;

    const result = await Booking.deleteByID(context, id, del);
    res.send(result);
});

router.del('/detail/:id', [authenticated, authorized], async (req, res) => {
    const {id} = req.params;
    const context = req.user;
    const del = req.params;

    const result = await Booking.deleteDetailByID(context, id, del);
    res.send(result);
});


// router.post('/Booking', [authenticated, authorized], async (req, res) => {
//     const {fullname, email, tel, address} = req.params;
//     const result = await Booking.create(fullname, email, tel, address);
//     res.send({
//         success: true, code: 200, 
//         data: result
//     });  
// });

// router.get('/Booking', [authenticated, authorized], async (req, res) => {
//     const result = await Booking.getAll(req);
//     res.send({
//         success: true, code: 200, 
//         data: result
//     });
// });

// router.get('/Booking/:id', [authenticated, authorized], async (req, res) => {
//     const {id} = req.params;
    
//     const result = await Booking.getByID(req, id);
//     res.send(result);
// });

// router.patch('/Booking/:id', [authenticated, authorized], async (req, res) => {
//     const {id} = req.params;
//     const context = req.user;
//     const patch = req.params;

//     const result = await Booking.updateByID(context, id, patch);
//     res.send(result);
// });

// router.del('/Booking/:id', [authenticated, authorized], async (req, res) => {
//     const {id} = req.params;
//     const context = req.user;
//     const del = req.params;

//     const result = await Booking.deleteByID(context, id, del);
//     res.send(result);
// });

module.exports = router;