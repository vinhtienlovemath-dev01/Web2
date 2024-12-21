exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE service(
            service_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,   
            service_name text,
            service_price double precision
        );
        COMMENT ON TABLE service IS 'Chi tiết thông tin dịch vụ';
        COMMENT ON COLUMN service.service_id IS 'Mã dịch vụ';
        COMMENT ON COLUMN service.service_name IS 'Tên dịch vụ';
        COMMENT ON COLUMN service.service_price IS 'Giá dịch vụ';
    `);
};

exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE service;
    `);
};