const { sign } = require('jsonwebtoken')
const { private_key } = process.env
module.exports = {
    createToken : (user, tokenStatus='confirm') => {
        console.log("USER", user);
        if(tokenStatus === 'confirm'){
            const token = sign({ id : user._id }, private_key , { expiresIn : '24h' })
            user.accessToken = token 
            return token
        }else if (tokenStatus === 'temp'){
            const token = sign({ id : user._id }, private_key , { expiresIn : '10m' })
            user.tempToken = token 
            return token
        }
    }
}
