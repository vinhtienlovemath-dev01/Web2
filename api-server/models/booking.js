const {getPgClient, getKnex} = require('./db.js');
const {rowFilter} = require('./security/row.js');
const {columnFilter} = require('./security/column.js')
const _ = require('lodash');
var format = require('pg-format');

const table_booking = 'booking';
const columns_booking = ['username', 'booking_date', 'checkin_date', 'checkout_date', 'total_price'];
const table_booking_detail = 'booking_detail';
const columns_booking_detail = ['booking_id', 'room_id', 'price_per_day', 'total_price'];

const getByCustomer = async (req, username) => {
    let knex = getKnex()(table_booking)
        .select(columns_booking)
        .where('username', username);
    knex = rowFilter(knex, "getByCustomer", table_booking, req.user);
    const result = await knex;
    return result;
}

const getByID = async (req, id) => {
    let knex = getKnex()(table_booking)
        .select(columns_booking)
        .where('booking_id', id);
    knex = rowFilter(knex, "getByID", table_booking, req.user);
    const result = await knex;
    return result;
}

const create = async (username, booking_date, checkin_date, checkout_date, total_price) => {
    let knex = getKnex()(table_booking)
        .insert(
            {username: username, booking_date: booking_date, checkin_date: checkin_date, checkout_date: checkout_date, total_price: total_price}, 
            ['username', 'booking_date', 'checkin_date', 'checkout_date', 'total_price']
        );
    result = await knex;
    return {
        success: username.length > 0,
        data: result  
    };
}

const updateByID = async (context, id, patch) => {
    const {role} = context;
    const validPatch = _.pick(patch, columnFilter(table_booking, role, "updateByID"));
    let knex = getKnex()(table_booking)
        .update(validPatch)
        .where({booking_id: id});
    knex = rowFilter(knex, "updateByID", table_booking, context);
    const rowCount = await knex;
    return {
        success: rowCount == 1,
        data: validPatch
    };    
}

const updateDetail = async (context, username, booking_id, detail_id, patch) => {
    const {role} = context;
    const validPatch = _.pick(patch, columnFilter(table_booking_detail, role, "updateDetail"));
    let knex = getKnex()(table_booking_detail)
        .join('booking', 'booking_id', '=', 'booking.booking_id')
        .update(validPatch)
        .where({booking_detail_id: detail_id, booking_id: booking_id});
    knex = rowFilter(knex, "updateDetail", table_booking_detail, context);
    const rowCount = await knex;
    return {
        success: rowCount == 1,
        data: validPatch
    };    
}

const deleteByID = async (context, id, del) => {
    const {role} = context;
    const validDel = _.pick(del, columnFilter(table_booking, role, "deleteByID"));
    let knex = getKnex()(table_booking)
        .del(validDel)
        .where({booking_id: id});
    knex = rowFilter(knex, "deleteByID", table_booking, context);
    const rowCount = await knex;
    return {
        success: rowCount == 1,
        data: validDel
    };    
}

const deleteDetailByID = async (context, id, del) => {
    const {role} = context;
    const validDel = _.pick(del, columnFilter(table_booking_detail, role, "deleteDetailByID"));
    let knex = getKnex()(table_booking_detail)
        .del(validDel)
        .where({booking_id: id});
    knex = rowFilter(knex, "deleteDetailByID", table_booking_detail, context);
    const rowCount = await knex;
    return {
        success: rowCount == 1,
        data: validDel
    };    
}

// const create = async (fullname, email, tel, address) => {
//     let knex = getKnex()(table)
//         .insert({fullname: fullname, email: email, tel: tel, address: address}, ['fullname', 'email', 'tel', 'address']);
//     // knex = rowFilter(knex, "create", table, req.user);
//     result = await knex;
//     return {
//         success: fullname.length > 0,
//         data: result  
//     };
// }

// const getAll = async (req) => {
//     let knex = getKnex()(table)
//         .select(columns);
//     knex = rowFilter(knex, "getAll", table, req.user);
//     const result = await knex;
//     return result;
// }

// const getByID = async (req, id) => {
//     let knex = getKnex()(table)
//         .select(columns)
//         .where('employee_id', id);
//     knex = rowFilter(knex, "getByID", table, req.user);
//     const result = await knex;
//     return result;
// }

// const updateByID = async (context, id, patch) => {
//     const {role} = context;
//     const validPatch = _.pick(patch, columnFilter(table, role, "updateByID"));
//     let knex = getKnex()(table)
//         .update(validPatch)
//         .where({employee_id: id});
//     knex = rowFilter(knex, "updateByID", table, context);
//     const rowCount = await knex;
//     return {
//         success: rowCount == 1,
//         data: validPatch
//     };    
// }

// const deleteByID = async (context, id, del) => {
//     const {role} = context;
//     const validDel = _.pick(del, columnFilter(table, role, "deleteByID"));
//     let knex = getKnex()(table)
//         .del(validDel)
//         .where({employee_id: id});
//     knex = rowFilter(knex, "deleteByID", table, context);
//     const rowCount = await knex;
//     return {
//         success: rowCount == 1,
//         data: validDel
//     };    
// }

module.exports = {
    getByCustomer, getByID, create, updateByID, updateDetail, deleteByID, deleteDetailByID
}