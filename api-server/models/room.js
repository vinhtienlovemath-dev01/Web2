const {getPgClient, getKnex} = require('./db.js');
var format = require('pg-format');
const _ = require('lodash');

const all = async() => {
    const client = getPgClient();
    var sql = "select * from room";
    var result = [];

    try {
        await client.connect();
        result = await client.query(sql);    
        result = result.rows
    } catch (e) {
        console.log(e);
    } finally {
        await client.end();
    }
    return result;
} 

const byId = async(id) => {
    const client = getPgClient();
    sql = format(
        "select * from room where room_id=%s",
        id
    );

    await client.connect();
    result = await client.query(sql);
    await client.end();

    found = result.rows.length > 0;
    return {
        found: found,
        data: result.rows[0]
    };
}

const create = async(name, price) => {
    const client = getPgClient();
    var sql = format(
        "insert into room(name, price) values(%L, %L)",
        name, price
    );

    await client.connect();
    result = await client.query(sql); 
    await client.end();

    var found = name.length > 0;
    return found;
}

const deleteByID = async(id) => {
    const client = getPgClient();
    var sql = format(
        "delete from room where room_id=%L",
        id
    );

    await client.connect();
    var result = await client.query(sql);
    await client.end();

    var found = result.rowCount > 0;
    return found;
}

const updateById = async (id, req) => {
    const info = _.pick(req.params, ['name', 'price']);    
    const rowCount = await getKnex()('room')
        .where('room_id', '=', id)
        .update(info);

        const success = rowCount > 0;

    if (success) {
        return {
            success: true, message: "Room updated successfully", data: {room: info}
        };
    } else {
        return {
            success: false, code: 1, message: `Cannot update room's information. Room with id ${id} does not exist.`,
        }
    }
}

module.exports = {
    all, byId, create, deleteByID, updateById
}