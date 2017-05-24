# restful-api-lbb

## Setup

1. Check the npm packages:

    ```
    npm install
    ```

2. Start the application

    ```
    node dist/api.js
    ```

## Managing the project with Grunt

* Runs eslint, babel:dist and mochaTest

    ```
    grunt
    ```

* Runs the tests (the same as ```npm test```)

    ```
    grunt mochatest
    ```

* Compiles the .es6 files to .js

    ```
    grunt babel:dist
    ```

* Lints the .es6 files

    ```
    grunt eslint
    ```
## Testing the Problem2

In MongoDB, there is a **categories** collection which categories are stored. Final save is in **document_categories** collection.

```
db.categories.find()
{ "_id" : "5909a74fc7083892e0478bf1", "type" : "A" }
{ "_id" : "5909a760c7083892e0478bf0", "type" : "B" }

```
### Endpoint
`POST  /problem2`
```
Payload:
[
    {
    	"_id": "5909a74fc7083892e0478bf1",
      "name": "how to reduce fat over 70",
      "category": "5909a74fc7083892e0478bf1"
    },
    {
      "_id": "5909a759c7083892e0478bf2",
      "name": "cataract symptoms",
      "category": "5909a759c7083892e0478bf2"
    },
    {
      "_id": "5909a760c7083892e0478bf0",
      "name": "KAP",
      "category": "5909a760c7083892e0478bf0"
    }
]

```
`Response`
```
200  OK
{
  "status": "success",
  "rejectedDocuments": [
    {
      "_id": "5909a759c7083892e0478bf2",
      "name": "cataract symptoms",
      "category": "5909a759c7083892e0478bf2"
    }
  ]
}
```

## Testing the Api
* To check the health of the server, call the healthcheck endpoint
```
GET   /v1/healthcheck
Heroku:
https://fast-chamber-88982.herokuapp.com/v1/healthcheck
```

* To Generate the valid Access Token
```
POST  /generateToken
Heroku
https://fast-chamber-88982.herokuapp.com/generateToken
```
Response
```
{
  "reqId": "f690dff0-33e0-11e7-8b3c-47bd26337ecc",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzaGFrdGlza21AZ21haWwuY29tIiwiaWF0IjoxNDk0MjQyNjk2LCJleHAiOjE0OTQyNzg2OTZ9.uFIXY168aDsFdro9Pbu4pAlsKIYIlqWtzKskhllZkbE",
  "status": "success"
}
```
* To call the products routes, refer the design document for Restful Api.
[https://github.com/shaktiskm/problem1_problem3_DesignDoc/blob/master/Problem3-DesignDocument.docx]
