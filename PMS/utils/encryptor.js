const bcrypt=require('bcryptjs')

var salt=10;

exports.hashing=(password)=>{
    return bcrypt.hashSync(password,salt);
}
exports.comparing = (password,hash)=>{
    return bcrypt.compareSync(password,hash)
}