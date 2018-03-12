# Google Task API demo wrapper

![sample screen](https://github.com/luisFilipePT/luis-tasks/blob/master/screen.png "Sample screen")

### Before Getting Started

You need to have a recent version of [NodeJS](https://nodejs.org/en/) and [npm](https://www.npmjs.com) installed.

### Getting Started

There are two methods for getting started with this repo.

#### Familiar with Git?
Checkout this repo, install dependencies, then start the gulp process with the following:

```
> git clone https://github.com/luisFilipePT/luis-tasks
> cd luis-tasks
> npm install or yarn
> npm start or yarn start
```

#### Not Familiar with Git?
Click [here](https://github.com/luisFilipePT/luis-tasks/archive/master.zip) then download the .zip file.  Extract the contents of the zip file, then open your terminal, change to the project directory, and:

```
> npm install or yarn
> npm start or yarn start
```

### Before running the project

- The project should run from `localhost:3000` or `localhost:3001`, otherwise it wont work due to the definitions in the google Task API.

- In case the browser that is running the project is using an adblock please disable it for this project. It can block the request for the Google Sign In necessary to run this project.

### Tests

To run the test suite

```
> npm run test or yarn test
```
