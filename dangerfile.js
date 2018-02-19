// Import the feedback functions
const { message, warn, fail, markdown, danger } = require("danger");
const fetchFailureJobs = require("./scripts/report-travis-results");
const TRAVIS_BUILD_ID = process.env.TRAVIS_BUILD_ID;
const TRAVIS_TOKEN = process.env.TRAVIS_TOKEN;

fetchFailureJobs(TRAVIS_BUILD_ID, TRAVIS_TOKEN).then(jobList => {
    if (jobList.length > 0) {
        warn(`See [CI](https://travis-ci.org/azu/danger-test/builds/${TRAVIS_BUILD_ID}`);
    } else {
        message("Success All!");
    }
});
// Add a message to the table
message("You have added 2 more modules to the app")

//  Adds a warning to the table
warn("You have not included a CHANGELOG entry.")

// Declares a blocking 
fail(`It failed with fails.`)