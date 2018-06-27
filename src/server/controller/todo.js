import model from '../models'

export default {
  create(req, res) {
    return model.Todo.findOne({
      where: { title: req.body.title }
    }).then((todo) => {
      if (todo) {
        return res.status(409).send({
          message: 'This Todo title already exists in system'
        })
      }

      return model.Todo.create(req.body).then((result) => {
        res.status(201).send({
          data: result,
          message: 'Todo created successfully'
        })
      }).catch((err) => {
        res.status(400).send({
          err,
          message: `Error occured while creating ${req.body.title}`
        })
      });
    })
  },

  getAll(req, res) {
    return model.Todo.findAll().then((todo) => {
      if (!todo) {
        res.status(404).send({
          message: 'No todo found'
        })
      }
      res.status(200).send({
        data: todo
      })
    }).catch((err) => {
      res.status(400).send({
        err,
        message: 'Error occured while fetching todo'
      })
    });
  },

  getById(req, res) {
    return model.Todo.findById(req.params.id).then((todo) => {
      if (!todo) {
        res.status(404).send({
          message: 'No todo found with this id'
        })
      }
      res.status(200).send({
        data: {
          title: todo.title,
          status: todo.status
        }
      })
    }).catch((err) => {
      res.status(400).send({
        err,
        message: 'Error occured while fetching todo'
      })
    });
  },

  getByStatus(req, res) {
    return model.Todo.findAll({
      where: { status: req.params.status }
    }).then((todos) => {
      if (!todos) {
        return res.status(404).send({
          message: 'No todos found'
        })
      }
      return res.status(200).send({
        data: todos
      })
    }).catch((err) => {
      res.status(400).send({
        err,
        message: 'Error occured while fetching todos by status'
      })
    });
  },

  updateById(req, res) {
    return model.Todo.findById(req.params.id).then((todo) => {
      if (!todo) {
        return res.status(404).send({
          message: 'No todo found with this id'
        })
      }
      if (req.body.title && todo.status === 'done') {
        return res.status(403).send({
          message: 'You cannot make an update for a completed Todo'
        })
      }
      return todo.update(req.body, { fields: Object.keys(req.body) })
        .then((result) => {
          res.status(200).send({
            data: {
              title: result.title,
              status: result.status
            },
            message: `Todo: ${todo.title} was successfully updated`
          })
        }).catch((err) => {
          res.status(400).send({
            err,
            message: ` Error occured while updating Todo: ${todo.title}`
          })
        });
    })
  },

  deleteById(req, res) {
    return model.Todo.findById(req.params.id).then((todo) => {
      if (!todo) {
        return res.status(404).send({
          message: 'No todo found with this id'
        })
      }
      if (todo.status !== 'done') {
        return res.status(403).send({
          message: 'You can only delete completed Todo'
        })
      }

      return todo.destroy().then((result) => {
        res.status(204).send({
          message: `Todo: ${todo.title} was deleted successfully`
        })
      }).catch((err) => {
        res.status(400).send({
          err,
          message: ` Error occured while deleting Todo: ${todo.title}`
        })
      });
    })
  }
}
