const Routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send({
      message: 'Welcome back Subair Oyindmaola Aminat'
    })
  })
}

export default Routes
