exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE employee(  
            employee_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            fullname text,
            email text,
            tel text,
            address text
        );
        COMMENT ON TABLE employee IS 'Nhân viên';
        COMMENT ON COLUMN employee.fullname IS 'Tên nhân viên';
        COMMENT ON COLUMN employee.email IS 'Email nhân viên';
        COMMENT ON COLUMN employee.tel IS 'Số điện thoại nhân viên';
        COMMENT ON COLUMN employee.address IS 'Địa chỉ nhân viên';
    `);
};

exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE employee;
    `);
};