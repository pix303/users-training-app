# users-training-app

Training projects to evaluate Nextjs (ver 12 and 13) and Remix

## server
Go minimal rest api for serving users data
- `GET: /users`: list all users (about 10)
- `GET: /users/$id`: get single user by id
- `GET: /users/search?name=something`: filter users by name
- `POST: /user`: add or update user
- `DELETE: /user`: not yet implemented

TODO: 
- minimal model in users list endpoint
- cors by lib


## User app
Apps implemented with different framework for presenting users with filter by name, user detail and form to update or insert user

## nextjs-user-app
App implemented with **Nextjs 12**

TODO:
- complete user detail view
- add/update view

## nextjs13-user-app
App implemented with **Nextjs 13**

## remix-user-app
 App implemented with **Remix**
