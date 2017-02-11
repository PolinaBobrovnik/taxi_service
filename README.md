# Taxi-Service is the course task at the university

## This appliacation is developed using a bundle of technologies such as:

* [AngularJS](https://angularjs.org/)
* [UI-Router](https://ui-router.github.io/)
* [Express](http://expressjs.com)
* [MySQLJS](https://github.com/mysqljs/mysql)
* [Gulp](http://gulpjs.com/)

#

## Required pre-installed tools on your local machine: 

1. [MySQL](https://dev.mysql.com/downloads/) (Server, Workbench)
2. [Node.js](https://nodejs.org)
3. Gulp as global NPM package (run `npm install gulp-cli -g`)


## How to run it:

1. Clone [this repository](https://github.com/artsiomshushkevich/NYT-books.git)
2. In the `/server/` directory run `npm install`
3. In the `/server/database` directory run `taxi_service.sql` in your CLI
4. For filling database run `inserts.sql`
5. In the `/server/src/` run `node app.js` (a server-side part of the application should be working now)
6. In the `/client/` directory run `npm install`
7. Run `gulp start` (a client-side part of the application should be working now)

> If you have some problems with new versions of NPM packages, you can extract attached archives
> to the folders which have names as in brackets

#

## Current functionality:

* User's page:
    * Add new users
    * Update users information
    * Delete users
    * Add emails and phones to the user
    * Delete emails and phones from the user
* Driver's page:
    * Add cars to the driver
    * Delete cars from the driver
    * Add rides to the driver
    * Delete rides from the driver
    * Set statuses of rides (`on the road`, `finish`)
* Client's page: 
    * Book tickets to existing rides with `registration is opened` status
    * Delete tickets
    * Leave comments
* Organization's page:
    * Add new organizations
    * Update orgnizations information
    * Add free drivers to the organization
    * Delete drivers from the organization
    * Show comment's details
    * Delete comments
* Route's page:
    * Add new routes
    * Update routes information
    * Delete routes













