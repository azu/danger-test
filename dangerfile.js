// Import the feedback functions
const { message, warn, fail, markdown, danger } = require("danger");
const fetchFailureJobs = require("./scripts/report-travis-results");
const TRAVIS_BUILD_ID = process.env.TRAVIS_BUILD_ID;
const TRAVIS_TOKEN = process.env.TRAVIS_TOKEN;

fetchFailureJobs(TRAVIS_BUILD_ID, TRAVIS_TOKEN).then(jobList => {
    if (jobList.length > 0) {
        warn(`${jobList.length} optional test is failed. Check [Travis CI Build Results](https://travis-ci.org/azu/danger-test/builds/${TRAVIS_BUILD_ID})`);
    } else {
        message("Success All!");
    }
});