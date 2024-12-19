# KnightBites-Service

This is the service application for the CS 262 KnightBites project.

The data service is hosted on Azure.

Client Repo: [KnightBites-Client](https://github.com/KnightBites/KnightBites-Client)

Project Repo: [KnightBites-Project](https://github.com/KnightBites/KnightBites-Project)

CS262 Project Requirements: [Requirements](https://cs.calvin.edu/courses/cs/262/kvlinden/15project/index.html)

KnightBites Trello Board: [Trello](https://trello.com/b/X4RF9w3o/cs262a-the-c-team-the-calvin-team)

## Endpoints

More information about each endpoint can be found in this repo's wiki.

| Command | Path | Description |
| ------------- | -------------- | -------------- |
| GET    | /dish                 | read all dishes
| GET    | /dish/:id             | read dish with given id
| POST   | /user                 | create new user
| POST   | /user/validate        | validate user login
| PUT    | /user/:id             | update user with given id
| DELETE | /user/:id             | delete user with given id
| GET    | /user/:id             | read user with given id
| GET    | /rating/:dishid       | read rating with given dish id
| PUT    | /rating/:dishid       | update rating with given dish id
| POST   | /rating               | create a new rating
| GET    | /uppercrust           | get all Uppercrust ingredient data
| POST   | /uppercrust           | put new sandwich in the database
| GET    | /uppercrust-creations | get all Uppercurst creations
| GET    | /prayer               | get random prayer
