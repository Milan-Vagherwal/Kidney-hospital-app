# Kidney-hospital-app
This Express.js server manages a user's kidney health data with endpoints to view kidney counts, add new kidneys, update all kidneys to healthy, or remove unhealthy ones. It tracks the health status of kidneys and responds to requests with the current state of the data.
Explanation:
Initialization:

Import Express and create an instance of an Express application.
Define an array users with sample data for testing.
Middleware:

app.use(express.json()): Parses JSON-formatted request bodies.
GET Route (/):

Calculates and returns the number of kidneys, healthy kidneys, and unhealthy kidneys in JSON format.
POST Route (/):

Adds a new kidney to the user's kidneys array with a health status provided in the request body.
Responds with a success message.
PUT Route (/):

Checks if there is at least one unhealthy kidney.
If so, sets all kidneys to healthy.
Responds with an empty JSON object if all kidneys are updated to healthy; otherwise, responds with an error message.
DELETE Route (/):

Checks if there is at least one unhealthy kidney.
If so, removes all unhealthy kidneys and keeps only the healthy ones.
Responds with a success message or an error message if no unhealthy kidneys are found.
Helper Function:

isThereAtleastOneunhealthyKidny(): Checks if there is at least one unhealthy kidney in the user's kidneys array.
Server Listening:

Starts the server on port 3000.
