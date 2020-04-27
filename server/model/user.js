var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
mongoose.Promise = global.Promise;

var schema = new mongoose.Schema({
    username: {
         type: String,
        required:  true,
    unique: true},
    password: {
        type: String,
        required: true},
    role: { 
        type: String,
        required: true},
    contact: Number
})

schema.pre('save', function(){
if(!this.isModified('password')) return next();

this.password = this.encryptPassword(this.password);
next();
})

schema.methods = {
authenticate: function(plainTextPword){
 return bcrypt.compareSync(plainTextPword, this.password)
},
encryptPassword: function(plainTextPword){
    if(!plainTextPword){
        return '';
    }else{
        var salt = bcrypt.genSaltSync(10);
     return bcrypt.hashSync(plainTextPword, salt);
    }
}
};

var user = new mongoose.model('User', schema);

module.exports = user;
