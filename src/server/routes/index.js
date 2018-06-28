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

  app.route('/todos')
    .post(authenticateToken, todoController.create)
    .get(todoController.getAll)

  app.route('/todo/:id')
    .get(authenticateToken, todoController.getById)
    .put(authenticateToken, todoController.updateById)
    .delete(authenticateToken, todoController.deleteById)

  app.route('/todos/:status')
    .get(todoController.getByStatus)

  app.route('/users')
    .post(userController.create)
    .get(authenticateToken, userController.getAll)

  app.route('/user/:id')
    .get(authenticateToken, userController.getById)
    .put(authenticateToken, verifyUserId, userController.updateById)
    .delete(authenticateToken, verifyUserId, userController.deleteById)

  app.route('/login')
    .post(authController.login)

}

export default Routes
