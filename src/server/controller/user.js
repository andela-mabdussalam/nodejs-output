import model from '../models'
import { hashPassword, token } from '../tools'

export default {
  create(req, res) {
    return model.User.findOne({
      where: { email: req.body.email }
    }).then((user) => {
      if (user) {
        return res.status(409).send({
          message: 'This User email already exists in the system'
        })
      }

      return model.User.create(req.body).then((result) => {
        res.status(201).send({
          data: result,
          token: token(result),
          message: 'User created successfully'
        })
      }).catch((err) => {
        res.status(400).send({
          err,
          message: `Error occured while creating ${req.body.email}`
        })
      });
    })
  },

  getAll(req, res) {
    return model.User.findAll({
      include: [{
        model: model.Todo,
        as: 'todos'
      }]
    }).then((user) => {
      if (!user) {
        res.status(404).send({
          message: 'No user found'
        })
      }
      res.status(200).send({
        data: user
      })
    }).catch((err) => {
      res.status(400).send({
        err,
        message: 'Error occured while fetching user'
      })
    });
  },

  getById(req, res) {
    return model.User.findById(req.params.id, {
      include: [{
        model: model.Todo,
        as: 'todos'
      }]
    }).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'No user found with this id'
        })
      }
      return res.status(200).send({
        data: {
          fullname: user.fullname,
          email: user.email,
          todos: user.todos
        }
      })
    }).catch((err) => {
      res.status(400).send({
        err,
        message: 'Error occured while fetching user'
      })
    });
  },

  updateById(req, res) {
    return model.User.findById(req.params.id).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'No user found with this id'
        })
      }
      if (req.body.password) {
        req.body.password = hashPassword(req.body.password)
      }
      return user.update(req.body, { fields: Object.keys(req.body) })
        .then((result) => {
          res.status(200).send({
            data: {
              fullname: user.fullname,
              email: result.email
            },
            message: `User: ${user.email} was successfully updated`
          })
        }).catch((err) => {
          res.status(400).send({
            err,
            message: ` Error occured while updating User: ${user.email}`
          })
        });
    })
  },

  deleteById(req, res) {
    return model.User.findById(req.params.id).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'No user found with this id'
        })
      }

      return user.destroy().then(() => {
        res.status(204)
      }).catch((err) => {
        res.status(400).send({
          err,
          message: ` Error occured while deleting User: ${user.email}`
        })
      });
    })
  }
}
