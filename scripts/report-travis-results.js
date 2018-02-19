const fetch = require("node-fetch");
const Headers = require("node-fetch").Headers;
async function fetchJobResult(TRAVIS_JOB_ID, TRAVIS_TOKEN){
    return fetch(`https://api.travis-ci.org/job/${TRAVIS_JOB_ID}`, {
        headers: new Headers({
            "Content-Type": 'application/json',
            "Travis-API-Version": "3",
            "User-Agent": "DEMO",
            "Authorization": `token ${TRAVIS_TOKEN}`
        })
    }).then(res => res.json());
}
async function main(TRAVIS_BUILD_ID, TRAVIS_TOKEN) {
    if (!TRAVIS_BUILD_ID) {
        throw new Error("TRAVIS_BUILD_ID not found");
    }
    const response = await fetch(`https://api.travis-ci.org/build/${TRAVIS_BUILD_ID}`, {
        headers: new Headers({
            "Content-Type": 'application/json',
            "Travis-API-Version": "3",
            "User-Agent": "DEMO",
            "Authorization": `token ${TRAVIS_TOKEN}`
        })
    }).then(res => res.json());
    const jobResults = await Promise.all(response.jobs.map(job => fetchJobResult(job.id, TRAVIS_TOKEN)));
    // state
    const failureJobList = jobResults.filter(job => {
        return job.state === "failed";
    });
    return failureJobList;
}
module.exports = main;