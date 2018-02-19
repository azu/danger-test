const fetch = require("node-fetch");
const Headers = require("node-fetch").Headers;
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
    console.log(response);
}

const TRAVIS_BUILD_ID = process.env.TRAVIS_BUILD_ID 
const TRAVIS_TOKEN = process.env.TRAVIS_TOKEN 
main(TRAVIS_BUILD_ID, TRAVIS_TOKEN);