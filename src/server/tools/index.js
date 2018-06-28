import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

export const token = (info) => {
  const secret = process.env.SECRET ? process.env.SECRET : 'thisisademosecret'
  return jwt.sign({
    data: {
      userId: info.id,
      email: info.email
    }
  }, secret, {
    expiresIn: '7d'
  });
}
