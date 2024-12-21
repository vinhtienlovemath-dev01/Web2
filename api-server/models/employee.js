const {getPgClient, getKnex} = require('./db.js');
const {rowFilter} = require('./security/row.js');
const {columnFilter} = require('./security/column.js')
const _ = require('lodash');
var format = require('pg-format');

const table = 'employee';
const columns = ['fullname', 'email', 'tel', 'address']

const create = async (fullname, email, tel, address) => {
    let knex = getKnex()(table)
        .insert({fullname: fullname, email: email, tel: tel, address: address}, ['fullname', 'email', 'tel', 'address']);
    // knex = rowFilter(knex, "create", table, req.user);
    result = await knex;
    return {
        success: fullname.length > 0,
        data: result  
    };
}

const getAll = async (req) => {
    let knex = getKnex()(table)
        .select(columns);
    knex = rowFilter(knex, "getAll", table, req.user);
    const result = await knex;
    return result;
}

const getByID = async (req, id) => {
    let knex = getKnex()(table)
        .select(columns)
        .where('employee_id', id);
    knex = rowFilter(knex, "getByID", table, req.user);
    const result = await knex;
    return result;
}

const updateByID = async (context, id, patch) => {
    const {role} = context;
    const validPatch = _.pick(patch, columnFilter(table, role, "updateByID"));
    let knex = getKnex()(table)
        .update(validPatch)
        .where({employee_id: id});
    knex = rowFilter(knex, "updateByID", table, context);
    const rowCount = await knex;
    return {
        success: rowCount == 1,
        data: validPatch
    };    
}

const deleteByID = async (context, id, del) => {
    const {role} = context;
    const validDel = _.pick(del, columnFilter(table, role, "deleteByID"));
    let knex = getKnex()(table)
        .del(validDel)
        .where({employee_id: id});
    knex = rowFilter(knex, "deleteByID", table, context);
    const rowCount = await knex;
    return {
        success: rowCount == 1,
        data: validDel
    };    
}

module.exports = {
    getAll, create, getByID, updateByID, deleteByID
}