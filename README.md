# Transit Tracker

A React (MERN - Mongo, Express, React, Node) stack app that allows you to get predictions for a stop/station from a transit agency.
Right now this app just has the WMATA - Washington, DC area transit system.  More will be added soon.


## Live Demo
https://glacial-savannah-56994.herokuapp.com/

## Instructions for running locally:
- git clone https://github.com/craigstroman/transit_tracker.git.
- cd github-notetaker.
- Run npm install.
- To run multiple commands like the server and dev environment open multiple terminal windows.
- Once the server is started, then go to http://localhost:3000.

## Available commands:
1. `npm run live:client` - Starts the development environment for the client.
1. `npm run live:server` - Starts the development environment for the server.
1. `npm run scss` - Builds the CSS for the server views and watches for changes.
1. `npm run prod:build` - Builds the production client.
1. `npm run prod:server` - Starts the server in production.

## Version History

###### Version 1.0.0
- Setup server and started to setup the local API.
- Added WMATA to the local API.
- Created React client interface using Redux to get data and update client.
- Using [React Select](https://github.com/JedWatson/react-select) control for the dropdowns.
- Using Bootstrap and SCSS for the CSS.
