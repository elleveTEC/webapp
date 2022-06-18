![GitHub Contributors](https://img.shields.io/github/contributors/chingu-voyages/v36-toucans-team-04?style=plastic)
![GitHub Language Count](https://img.shields.io/github/languages/count/chingu-voyages/v36-toucans-team-04?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/chingu-voyages/v36-toucans-team-04?style=plastic)

# User story effort prediction

A model based on user stories obtained from the Cemex Go app through JIRA, which allows predictions of the days of effort required by a task or project.

## Overview

The main purpose of this application is to be able to obtain an effort prediction in number of days necessary to fulfill different user stories, through a web application.
It looks forward to optimize the scheduling and estimation of times related to the development of CEMEX Go.

## Features

| Key Feature       | Status   |
| ----------------- | -------- |
| Login             | Complete |
| Effort prediction | Complete |
| Record            | Complete |
| Profile           | Complete |

## Running the Project

This project has a backend server that can be found in the following link and has to be runned together with this project.

> Live Link: https://github.com/elleveTEC/API

### Steps

1. Clone this repository.

   > Live Link: https://github.com/elleveTEC/webapp

2. cd to the project folder.

```
    cd webapp
```

3. Install dependencies.

```
    npm install
```

4. Run the app.

```
    npm start
```

5. Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>N</kbd> to open a new terminal and run the following command in order to serve model files in port 8080.

```
    http-server ./src/model/
```

## Languages

- HTML
- CSS
- Javascript
- JSX

## Dependencies

- http-server
- ReactJS
- TensorFlow
- Redux
- React Router
