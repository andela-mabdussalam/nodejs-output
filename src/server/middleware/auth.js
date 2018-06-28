import jwt from 'jsonwebtoken'

const secret = process.env.SECRET || 'thisisademosecret'

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers['x-access-token']

  if (!token) {
    return res.status(401).send({
      message: 'Unauthorize access'
    })
  }

  return jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).send({
        message: 'Invalid token'
      })
    }

    req.decoded = decoded
    return next()
  })
}

export const verifyUserId = (req, res, next) => {
  const { userId } = req.decoded.data

  if (userId.toString() !== req.params.id) {
    return res.status(403).send({
      message: 'You do not have the authorization to make this changes'
    })
  }

  return next()
}
