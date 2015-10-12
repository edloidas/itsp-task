ITS Partner Task
=========

[![Dependency Status](https://david-dm.org/edloidas/jetstream.svg)](https://david-dm.org/edloidas/jetstream)
[![devDependency Status](https://david-dm.org/edloidas/jetstream/dev-status.svg)](https://david-dm.org/edloidas/jetstream#info=devDependencies)

> A test for the application for a job in ITS Partner.

Create a single page application with React, that allows the user to select the time interval and see a graph of the specified currency.

##### You should use #####

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


## Install ##

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
Instead of the `npm run production` you can run development build, that will also some developer tools and will not do optimizations to the code:

```bash
# Development build can be run like this
npm run development
# ... or this
npm run gulp
```

## IIS Express: Deploy and Run ##

```bash
# Zip the public package content before the deployment to the IIS server
npm run zip
```
Read the [IIS Express](IISEXPRESS) for further details.


## Licence ##

[MIT License](LICENSE)
