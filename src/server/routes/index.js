import controller from '../controller'

const todoController = controller.todo
const userController = controller.user

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

  app.route('/users')
    .post(userController.create)
    .get(userController.getAll)

  app.route('/user/:id')
    .get(userController.getById)
    .put(userController.updateById)
    .delete(userController.deleteById)

}

export default Routes
