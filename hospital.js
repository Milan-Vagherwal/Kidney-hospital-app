const express = require("express");
const app = express();

// Sample data for users and their kidneys
var users = [{
    name: "john",
    kidneys: [{
        healthy: false
    }, {
        healthy: true
    }]
}];

// Middleware to parse JSON bodies
app.use(express.json());

// GET request handler for the root route
app.get("/", function(req, res) {
    // Retrieve John's kidneys
    const johnskidny = users[0].kidneys;
    const numberoflidneys = johnskidny.length;
    let numberofhealthyKidneys = 0;

    // Count the number of healthy kidneys
    for (let i = 0; i < johnskidny.length; i++) {
        if (johnskidny[i].healthy) {
            numberofhealthyKidneys++;
        }
    }

    // Calculate the number of unhealthy kidneys
    const numberofunhealthyKidneys = numberoflidneys - numberofhealthyKidneys;

    // Respond with the count of kidneys and their health status
    res.json({
        numberoflidneys,
        numberofhealthyKidneys,
        numberofunhealthyKidneys
    });
});

// POST request handler for the root route
app.post("/", function(req, res) {
    // Retrieve the 'ishealthy' value from the request body
    const ishealthy = req.body.ishealthy;

    // Add a new kidney with the specified health status
    users[0].kidneys.push({
        healthy: ishealthy
    });

    // Respond with a success message
    res.json({
        msg: "Done!"
    });
});

// PUT request handler for the root route
app.put("/", function(req, res) {
    // Check if there's at least one unhealthy kidney
    if (isThereAtleastOneunhealthyKidny()) {
        // Set all kidneys to healthy
        for (let i = 0; i < users[0].kidneys.length; i++) {
            users[0].kidneys[i].healthy = true;
        }
        // Respond with an empty JSON object
        res.json({});
    } else {
        // Respond with an error message if all kidneys are already healthy
        res.status(411).json({
            msg: "All kidneys are already healthy"
        });
    }
});

// DELETE request handler for the root route
app.delete("/", function(req, res) {
    // Check if there's at least one unhealthy kidney
    if (isThereAtleastOneunhealthyKidny()) {
        const newkidny = [];

        // Remove unhealthy kidneys
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newkidny.push({
                    healthy: true
                });
            }
        }

        // Update the kidneys array with only healthy kidneys
        users[0].kidneys = newkidny;

        // Respond with a success message
        res.json({ msg: "done" });
    } else {
        // Respond with an error message if no unhealthy kidneys are found
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
});

// Function to check if there is at least one unhealthy kidney
function isThereAtleastOneunhealthyKidny() {
    let atleastoneunhealthykidny = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atleastoneunhealthykidny = true;
        }
    }
    return atleastoneunhealthykidny;
}

// Start the server on port 3000
app.listen(3000);
