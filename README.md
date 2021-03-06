ITS Partner Task
================

[![Dependency Status](https://david-dm.org/edloidas/itsp-task.svg)](https://david-dm.org/edloidas/itsp-task)
[![devDependency Status](https://david-dm.org/edloidas/itsp-task/dev-status.svg)](https://david-dm.org/edloidas/itsp-task#info=devDependencies)

> A test for the application for a job in ITS Partner.

Create a single page application with React, that allows the user to select the time interval and see a graph of the specified currency.

##### Task #####

* React
* ~~[MTBank web service](http://www.mtbank.by/private/currency)~~ (changed to NBRB);
* [NBRB web service](http://www.nbrb.by/statistics/Rates/XML/);
* Use `GET` request for retrieving the data from service;
* Any other library or tool needed.


## Used tools ##

* [Jetstream](https://github.com/edloidas/jetstream) -- my personal Gulp project template. Not yet integrated with Yeoman, so everything was updated by hands. Jetstream includes:
	- Gulp
	- webpack
	- Babel
	- PostCSS
	- BrowserSync
* React
* Chart.js
* lodash (debounce)
* xml2js

## Features ##

* As you can see, React components uses the `class`. Other entities uses plain old `function` and composition. Classes are not good, but since we are using Babel and React, we should write it that way.
* jQuery and YQL are used for all cross-domain GET requests.


## Install ##

Before building the project, you must install [Node.js](https://nodejs.org/en/) with npm first.
You may also want to simplify project build or run, so just install gulp globally:
```bash
npm install -g gulp
```

After preparations are completed, proceed with the following steps:

```bash
# Step 1: Clone the itsp-task repository
git clone https://github.com/edloidas/itsp-task.git
# Step 2: Navigate to the cloned repository
cd itsp-task
# Step 3: Make sure to properly install all dependencies
npm install
# Step 4: Run production build
npm run production
```
Instead of the `npm run production` you can run development build, which will also give you some developer tools (sourcemaps and BrowserSync) and will not do optimizations to the code:

```bash
# Development build can be run like this
npm run gulp
# ... or this (without BrowserSync)
npm run development
```

## IIS Express: Deploy and Run ##

Read the [IIS Express](IISEXPRESS.md) for further details.


## Licence ##

[MIT License](LICENSE)
