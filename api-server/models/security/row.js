let policies = {
    "manager": {
        "admin": {
            "getAll": (knex) => knex,
            "update": (knex) => knex,
        },
        "manager": {
            "getAll": (knex, user) => 
                knex.where({username: user.username}),
            "update": (knex, user) => 
                knex.where({username: user.username}),            
        }
    },
    "customer": {
        "admin": {
            "getAll": (knex) => knex,
            "getByID": (knex) => knex,
            "updateByID": (knex) => knex,
            "deleteByID": (knex) => knex,
        },
        "manager": {
            "getAll": (knex) => knex,
            "getByID": (knex) => knex,
            "updateByID": (knex) => knex, 
            "deleteByID": (knex) => knex,         
        },
        "customer": {
            "getAll": (knex, user) => 
                knex.where({username: user.username}),
            "getByID": (knex, user) => 
                knex.where({username: user.username}),
            "updateByID": (knex, user) => 
                knex.where({username: user.username}),
        }
    },
    "employee": {
        "admin": {
            "getAll": (knex) => knex,
            "create": (knex) => knex,
            "getByID": (knex) => knex,            
            "updateByID": (knex) => knex,            
            "deleteByID": (knex) => knex,            
        }
    },
    "booking": {
        "admin": {
            "getByCustomer": (knex) => knex,
            "getByID": (knex) => knex,
            "create": (knex) => knex,
            "updateByID": (knex) => knex,
            "deleteByID": (knex) => knex,
        }
    },
    "booking_detail": {
        "admin": {
            "updateDetail": (knex) => knex,
            "deleteDetailByID": (knex) => knex,
        }
    },
    "service": {
        "admin": {
            "getAll": (knex) => knex,
            "getByID": (knex) => knex,
            "create": (knex) => knex,
            "deleteByID": (knex) => knex,
            "updateByID": (knex) => knex
        },
        "manager": {
            "getAll": (knex) => knex,
            "getByID": (knex) => knex,
            "create": (knex) => knex,
            "deleteByID": (knex) => knex,
            "updateByID": (knex) => knex
        },
        "customer": {
            "getAll": (knex) => knex,
        }
    }
};

module.exports.rowFilter = function(knex, action, table, context) {
    return policies[table][context.role][action](knex, context);
}