# nodejs-output

## Functionality
Design and Build a simple CRUD API for  todos.
- Each todo has an id, a title and status.
- There are 3 values for status [In progress, done, not started]).
- I can only delete a todo that has status = ‘done’.
- I can update the status of a todo
- I cannot edit the title of a todo that has status = "done".
- I should be able to view all todos, todo by Id, and todos by status

## Routes
* POST `/users` for creating new user
* GET `/users` for fetching all users
* GET `/user/:id` for fetching user by `id` which also includes user's todo lists
* PUT `/user/:id` for update user by `id`
* DELETE `/user/:id` for deleting user by `id`
* POST `/user/:userId/todos` for creating a user's todo
* GET `/user/:userId/todo/:id` for fetching user's todo by user `id` and todo `id`
* GET `/user/:userId/todos/:status` for fetching user's todos by `todo status`
* PUT `/user/:userId/todo/:id` for updating to todo by `id`
* DELETE `/user/:userId/todo/:id` for deleting to todo by `id`
* GET `/todos`
* POST `/login` for user login

### Request Body
* POST `/users`:
  ```json
  {
    "fullname": "ToBe Deleted",
    "email": "delete@email.com",
    "password": "p@ssword"
  }
  ```
* POST `/user/:userId/todos`:
  * `status` has a default value - `not started`
  ```json
  {
    "title": "To be Deleted todo",
    "status": "in progress",
  }
  or
  {
    "title": "with out status"
  }
  ```
* POST `/login`:
  ```json
  {
    "email": "delete@email.com",
    "password": "p@ssword"
  }