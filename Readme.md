## Important Note

To this assessment I wanted to try out some new technologies I hadn't used before, so I probably am not following best practices and folder structure might not be optimal, please bear in mind that I have done this project in less than 6 days. 

I haven't created a production environment, or deployed the app (didn't have enough time), but have some experience doing so, and could do it if necessary.
To populate the database I have scraped www.gsmarena.com.

I have also done the robots project very fast, I wanted to send RabbitMQ messages that's why I made it asynchronous, but didn't have time to add RabbitMQ, it's quite messy.The idea was to create a rabbit worker that sends a message to the backend every time the Robot moves, and to add subscriptions with GraphQL to see how the robot is moving in the frontend. The code quality has a lot of room for improvement, since one method has side effects, and initally I wanted to create and inmmutable behaviour but that would have taken more time.

The technologies I had never used before are :

##### Prisma2 
"Prisma helps app developers build faster and
make fewer errors with an open source ORM for PostgreSQL, MySQL and SQLite."
https://www.prisma.io/

##### NexusJS
"Declarative, Code-First GraphQL Schemas for JavaScript/TypeScript"

https://nexusjs.org/


##### ApolloGraphQL
"Apollo is the industry-standard GraphQL implementation, providing the data graph layer that connects modern apps to the cloud."

https://www.apollographql.com/


##### NextJS
 Next.js is a React framework for developing single page Server Side Rendered (SSR) Javascript applications.
 
https://nextjs.org/

The React file strutcure I have used is the following, (I hadn't used React since before the hooks) So again , folder structure, component reusability and best practices haven't been applied thoroughly

https://react-file-structure.surge.sh/


### Description

**Docker necessary!**

To run the app I have created a few scripts to make it easier for the reviewer to be able to get it running. Obviously these scripts are not good for development since some install dependencies every time they are executed.

We need to run the commands in the following order:

``` nvm use ```    :   To make sure the Node version is the correct one.

``` make build_backend ```  :   This command will build, and populate the database.

``` make run_backend ```    :   This command will run the server.

``` make run_frontend ```.  :   This command will install the dependencies and run the frontend.

Then we can go to: http://localhost:8888

### Testing.

I have only written a few tests, but normally I like to have 100% test coverage. 
To run the tests:

``` make backend_test```    :   To run this command we will have to have built the backend.

``` make frontend_test```   :   Just 2 components tested....

``` make robots_test```.    :   Tests for the Mars robots exercise.






