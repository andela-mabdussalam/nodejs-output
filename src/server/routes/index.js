import controller from '../controller'
import { authenticateToken, verifyUserId } from '../middleware/auth'

const todoController = controller.todo
const userController = controller.user
const authController = controller.auth

const Routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send({
      message: 'Welcome back Subair Oyindamola Aminat'
    })
  })

  app.route('/users')
    .post(userController.create)
    .get(authenticateToken, userController.getAll)

  app.route('/user/:id')
    .get(authenticateToken, userController.getById)
    .put(authenticateToken, verifyUserId, userController.updateById)
    .delete(authenticateToken, verifyUserId, userController.deleteById)

  app.route('/user/:userId/todos')
    .post(authenticateToken, todoController.create)

  app.route('/todos')
    .get(authenticateToken, todoController.getAll)

  app.route('/user/:userId/todo/:id')
    .get(authenticateToken, verifyUserId, todoController.getById)
    .put(authenticateToken, verifyUserId, todoController.updateById)
    .delete(authenticateToken, verifyUserId, todoController.deleteById)

  app.route('/user/:userId/todos/:status')
    .get(todoController.getByStatus)

  app.route('/login')
    .post(authController.login)

}

export default Routes
