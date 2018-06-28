import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

const secret = process.env.SECRET ? process.env.SECRET : 'thisisademosecret'

export const token = (info) => {
  jwt.sign({
    data: {
      userid: info.id,
      email: info.email
    }
  }, secret, {
    expiresIn: '7d'
  });
}
