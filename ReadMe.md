# Stayshare
A stayshare platform This platform allows people to accommodate others for an agreed period of time. Stayshare offers a unique way to share your space and experiences with others.

## API Functionality
An Express based RESTful API design was used to access a MongoDB database for data storage and retrieval.
Using JWT tokens to provide stateless authenticated access for retreiving and storing data in persistent storage.

This API provides the following Endpoints check the documentation [here]():


## Technologies used

This project is Bootstrapped with with the following stack:

1. [Node](https://nodejs.org/en/) (Javacript runtime).
2. [Express](https://expressjs.com/) (For creating endpoints, routing, and serving files).
3. [TypeScript](https://www.typescriptlang.org/) (A super set of Javacript).
4. [Jest](https://jestjs.io/) (for testing).
5. [jsonwebtoken](https://jwt.io/) (JWT) (for stateless interaction).
6. [mongoDB Atlas](https://www.mongodb.com/) (An integrated suite of cloud database and data services to accelerate and simplify how you build with data.).
7. [mongoose](https://mongoosejs.com/)(Mongoose provides a straight-forward, schema-based solution to model your application data.)


All of the dependencies required are listed in the package.json file. Use `npm install` on the command line. Environment variables are defined in a example.env file.

> However, you will need to install node and mongoDB globally on your local machine


## Installation and Environment Setup

The following steps outline will set you up on how to install the app on your local machine.

1. Clone this repository 

```
git clone https://github.com/salimkarbm/stayshare.git
```
2. From the terminal, change directory to stayshare folder 

```
cd stayshare
```
3. Run `npm install` This will install the necessary packages and dependencies based on the supplied package.json.

4. Then run the app with the command `npm run start:dev`

5. Once these are set, connect to your cloud or local database.



## Running the Jest Test

To run jest test use the following commands:

```
npm run testdb
```
this will run migration for test database.

To run models and endpoints test run the following command

```
npm run test
```

run the following command to drop the test database

```
npm run drop-testdb
```

### Usage

The endpoints available for interacting with the API can be found in the Documentation [here]()

### :handshake: Contributing
Contributions are currently not allowed ❌ but please feel free to submit issues and feature requests ✅

### Authors

Github:[@salimkarbm](https://github.com/salimkarbm)\
LinkedIn:[Salim Imuzai](https://www.linkedin.com/in/salimkarbm/)\
Twitter:[@salimkarbm](https://twitter.com/salimkarbm)

### Show your support

   - Give a :star: if you like this project