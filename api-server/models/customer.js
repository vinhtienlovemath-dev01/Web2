const {getPgClient, getKnex} = require('./db.js');
const {rowFilter} = require('./security/row.js');
const {columnFilter} = require('./security/column.js')
const _ = require('lodash');
var format = require('pg-format');

const table = 'customer';
const columns = ['username', 'fullname', 'email', 'tel']

const create = async (username, password) => {
    const client = getPgClient();
    var sql = format(
        "select public.create_account(%L, %L, 'customer');",
        username, password
    );
    await client.connect();
    result = await client.query(sql); 
    await client.end();

    let knex = getKnex()(table)
        .insert({username: username, fullname: '', email: '', tel: ''}, ['username']);
    result = await knex;
    return {
        success: username.length > 0,
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

const getByID = async (req, username) => {
    let knex = getKnex()(table)
        .select(columns)
        .where('username', username);
    knex = rowFilter(knex, "getByID", table, req.user);
    const result = await knex;
    return result;
}

const updateByID = async (context, username, patch) => {
    const {role} = context;
    const validPatch = _.pick(patch, columnFilter(table, role, "updateByID"));
    let knex = getKnex()(table)
        .update(validPatch)
        .where({username: username});
    knex = rowFilter(knex, "updateByID", table, context);
    const rowCount = await knex;
    return {
        success: rowCount == 1,
        data: validPatch
    };    
}

const deleteByID = async (context, username, del) => {
    const {role} = context;
    const validDel = _.pick(del, columnFilter(table, role, "deleteByID"));
    let knex = getKnex()(table)
        .del(validDel)
        .where({username: username});
    knex = rowFilter(knex, "deleteByID", table, context);
    const rowCount = await knex;
    return {
        success: rowCount == 1,
        data: validDel
    };    
}

module.exports = {
    getAll, getByID, updateByID, deleteByID, create
}