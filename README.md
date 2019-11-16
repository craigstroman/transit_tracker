# Transit Tracker

A React (MERN - Mongo, Express, React, Node) stack app that allows you to get predictions for a stop/station from a transit agency.
Right now this app just has the WMATA - Washington, DC area transit system.  More will be added soon.


## Live Demo
https://transit-tracker.craigstroman.com/

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

## Types of transit as defined by GTFS:
0 - Light rail - Streetcar, light rail.
1 - Heavy rail - Subway, Metro. Any underground rail system.
2 - Rail - Commuter rail, etc.
3 - Bus - Used for short and long distance bus routes.
4 - Ferry - Used for short and long distance boat service.


## Version History

###### Version 1.5.0
- Various fixes to the client.
- Upgrading Axios.

###### Version 1.4.0
- Fixed issue with WMATA subway stations not loading in order of stations.
- Fixed issue with WMATA subway predictions not showing all predictions for a selected direction.

###### Version 1.3.0
- Upgraded version of React and React-Dom being used.

###### Version 1.2.0
- Added Google maps for busses so you can see where buses are on the route.
- Increased the refresh rate for predicitions.
- Added bus route and position controllers for WMATA.

###### Version 1.1.0
- Added [sass-resources-loader](https://www.npmjs.com/package/sass-resources-loader) to share variables and mixins in SCSS.
- Fixed the responsive break points for the option colums.

###### Version 1.0.0
- Setup server and started to setup the local API.
- Added WMATA to the local API.
- Created React client interface using Redux to get data and update client.
- Using [React Select](https://github.com/JedWatson/react-select) control for the dropdowns.
- Using Bootstrap and SCSS for the CSS.
