# Rokode exam API

To set up the application first of all you need to install on your system the following
- Node.js (v10.10.0)
- Postgresql (v9.6)

## installing the dependencies
to install the dependencies you need to run the <code>sudo npm install</code> in your terminal inside application root directory

### Run the migration

First of all, if you don't have your database server up and running execute the following command: <code>sh scripts/up-database.sh</code>
this will up the database server.

To run the migration you need to execute the following command: <code>sh scripts/rebuild-db.sh</code>
this will create a database user role if not exist, as well as creating the database, and schema with all used tables.



after running the migrations to start the app execute the following command
<code>
 npm start
</code>



Endpoints    |  HTTP verbs    
------------ | -------------
__/tickets__ |  __POST__
__/login__   |  __POST__