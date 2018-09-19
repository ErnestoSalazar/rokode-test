# Rokode exam API

To set up the application first of all you need to install on your system the following
- Node.js (v10.10.0)
- Postgresql (v9.6)

the application does encrypt passwords using SHA3

## installing the dependencies
to install the dependencies you need to run the <code>npm install</code> in your terminal inside application root directory

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



### POST endpoints
__/tickets__
<details>
<summary>see details</summary>
  <details>
  <summary>request details</summary>
       <pre>
        {
        	"name": "Ernesto Salazar",
        	"password": "$miPassword0."
        }
      </pre>
  </details>
  
  <details>
  <summary>response</summary>
         <pre>
          {
              "id": 1,
              "name": "ernestos",
              "password": "91ad69198b9767bf1e4103b63658e23b9c9cc966125552a4ca5b02af4590cdb930011f880820b88feb626ac90eaef30d29533e688539b196c8cb89bda8d29e0b",
              "ticketCode": "HS-82",
              "updatedAt": "2018-09-19T19:47:26.016Z",
              "createdAt": "2018-09-19T19:47:26.016Z"
          }
        </pre>
  </details>
</details>

__/login__
<details>
<summary>see details</summary>
  <details>
  <summary>request details</summary>
       <pre>
        {
        	"name": "ernestos",
        	"password": "$miPassword0.",
        	"accessTicket": "HS-82"
        }
      </pre>
  </details>
  
  <details>
  <summary>response</summary>
         <pre>
          {
              "message": "welcome",
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTM3Mzg2NTMyfQ.OMs6Hjh4z4i-xs82mo52NRlbUTkuBQ88U2T6SgSCaM0"
          }
        </pre>
  </details>
</details>



### Questions

__What will happen if the codes end?__
After all codes finished the program will throw an error telling the user that the system reached the tickets limit


__How would you detect it?__
an easy way is to get the permutation of the combination to get the total possible combinations, if the database has that same ammount of records
it means that the system reached the codel limit.

__How would you solve it?__
a way to solve is to add a boolean column to check the status of a field, if the ticket is fulfilled it means that is not longer required for that particular ticket
and it can be used by other person (this would only work) if the AccessTicket table had a relation with a user table so every user can have their own history of tickets
(that feature wasn't part of the requirements)

__What error would you show?__
the system reached the tickets limit

__How would you improve the security of the system, specifically the generation / storage of codes?__
i would personally add more characters to the format so the possible combinations can increase,
we could encrypt the tickets in the database but that is not a good idea because there is no way to recover the ticket code
if the user lose it

__What would change in your system if the generation of codes was not inside your system?__
instead of writing a generation code method i would write one that calls that service using the <code>http</code> or <code>https</code> node modules


```javascript
http.get('http://mytickets.org/', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    return error;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      return parsedData
    } catch (e) {
      return e
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});
```

__What validations would you make?__
i would search for the status code of the request and the message of the request, also if its of type of <code>undefined, null, Error</code>