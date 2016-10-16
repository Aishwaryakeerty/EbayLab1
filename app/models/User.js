var hyena = require('hyena'),
    connection = require('hyena/lib/mysql'),
    Schema = hyena.Schema;

var UserSchema = new Schema({
    login:{ type: 'string', required: true },
    password: { type: 'string', required: true },
    admin: { type: 'Boolean', required: true },
    is_active : { type: 'Boolean', required: true },
});

module.exports = hyena.model('User', UserSchema);
