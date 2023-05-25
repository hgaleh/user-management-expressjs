## First install

### `npm install`

## Then run it

### `npm run dev`

## Use curl to test it

To get all users

`curl -X GET http://localhost:3000/api/users/search`

To search and filter users

`curl -X GET http://localhost:3000/api/users/search?firstName=&lastName=&phone=&email=`

To add a user

`curl -X POST http://localhost:3000/api/users/add --header 'Content-Type: application/json' --data '{}'`

To update a user

`curl -X PUT http://localhost:3000/api/users/update --header 'Content-Type: application/json' --data '{}'`

To delete a user

`curl -X DELETE http://localhost:3000/api/users/delete/:id`
