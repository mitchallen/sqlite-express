sqlite-express
==

## Usage

```sh
npm start
```

### POST

```sh
curl -X POST -H "Content-Type: application/json" -d '{"name":"Jack", "email":"jack@example.com"}' http://localhost:3000/users
```

```sh
curl -X POST -H "Content-Type: application/json" -d '{"name":"Jill", "email":"jill@example.com"}' http://localhost:3000/users
```

### GET

```sh
curl http://localhost:3000/users
```

```sh
curl http://localhost:3000/users/1
```