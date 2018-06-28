import bcrypt from 'bcrypt'
import model from '../models';
import { token } from '../tools'

export default {
  login(req, res) {
    return model.User.findOne({
      where: { email: req.body.email }
    })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'Authentication Failed. User not found.'
          });
        }
        // check if password matches
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).send({
            message: 'Authentication failed. Wrong password.'
          });
        }
        return res.status(200).send({
          token: token(user),
          message: 'User authenticated successfully'
        });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error occurred while authenticating user'
      }));
  }
}
