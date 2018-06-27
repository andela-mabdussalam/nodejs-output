import controller from '../controller'

const todoController = controller.todo

const Routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send({
      message: 'Welcome back Subair Oyindamola Aminat'
    })
  })

  app.route('/todos')
    .post(todoController.create)
    .get(todoController.getAll)

  app.route('/todo/:id')
    .get(todoController.getById)
    .put(todoController.updateById)
    .delete(todoController.deleteById)

  app.route('/todos/:status')
    .get(todoController.getByStatus)

}

export default Routes
