let policies = {
    "manager": {
        "admin": {
            "update": ['fullname', 'base_salary']
        },
        "manager": {
            "update": ['fullname']            
        }
    },
    "customer": {
        "admin": {
            "getByID": ['username', 'fullname', 'email', 'tel'],
            "updateByID": ['fullname', 'email', 'tel'],
        },
        "manager": {
            "getByID": ['username', 'fullname', 'email', 'tel'],
            "updateByID": ['fullname', 'email', 'tel'],
        }
    },
    "employee": {
        "admin": {
            "getAll": ["fullname", "email", "tel", "address"],
            "create": ["fullname", "email", "tel", "address"],
            "getByID": ["fullname", "email", "tel", "address"],
            "updateByID": ["fullname", "email", "tel", "address"],
            "deleteByID": ["fullname", "email", "tel", "address"],
        }
    },
    "booking": {
        "admin": {
            "getByCustomer": ['username', 'booking_date', 'checkin_date', 'checkout_date', 'total_price'],
            "getByID": ['username', 'booking_date', 'checkin_date', 'checkout_date', 'total_price'],
            "create": ['username', 'booking_date', 'checkin_date', 'checkout_date', 'total_price'],
            "updateByID": ['username', 'booking_date', 'checkin_date', 'checkout_date', 'total_price'],
            "deleteByID": ['username', 'booking_date', 'checkin_date', 'checkout_date', 'total_price'],
        }
    },
    "booking_detail": {
        "admin": {
            "updateDetail": ['booking_id', 'room_id', 'price_per_day', 'total_price'],
            "deleteDetailByID": ['booking_id', 'room_id', 'price_per_day', 'total_price'],
        }
    },
    "service": {
        "admin": {
            "getAll": ["service_id", "service_name", "service_price"],
            "getByID": ["service_id", "service_name", "service_price"],
            "create": ["service_id", "service_name", "service_price"],
            "deleteByID": ["service_id", "service_name", "service_price"],
            "updateByID": ["service_id", "service_name", "service_price"],
        },
        "manager": {
            "getAll": ["service_id", "service_name", "service_price"],
            "getByID": ["service_id", "service_name", "service_price"],
            "create": ["service_id", "service_name", "service_price"],
            "deleteByID": ["service_id", "service_name", "service_price"],
            "updateByID": ["service_id", "service_name", "service_price"],
        },
        "customer": {
            "getAll": ["service_id", "service_name", "service_price"],
        }
    }
};

module.exports.columnFilter = function(table, role, action) {
    return policies[table][role][action];
}