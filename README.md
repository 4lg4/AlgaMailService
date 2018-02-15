# Alga Mail Service


#### Get Started
````bash
npm install
````
set the config file
/src/env.json
````json
{
    "services": {
        "MailGun": {
            "url": "...",
            "auth": "..."
        },
        "SendGrid": {
            "url": "...",
            "auth": "..."
        },
        ...
    },
    "maxAttempts": 5, // max rand attempts 
    "from": "email@email.com", // default email if not set on the post request
    "preferred": "", // Service Name or empty for roulette mode
    "debug": "true"  // empty === false
}
````
#### starting service Development
````bash
npm run start-dev
````
or
````bash
NODE_PORT=9999 npm run start-dev
````

#### Testing the service
````
POST https://localhost:3000 
{
	"from": "no-reply@email.com",
	"to": "to@email.com",
	"subject": "The Subject",
	"text": "text email part",
	"html": "<div style='color:red;'>HTML</div>"
}      
````

#### Build
all compiled files to /dist folder
````bash
npm run build
````

#### Docker 
````bash
npm run build-docker
````
or for development
````bash
npm run start-docker
````

#### starting service Development
````bash
npm run start-prod
````
or
````bash
NODE_PORT=9999 npm run start-prod
````

#### Tests
not all tests implemented
````bash
mocha test/AlgaRequest.js --compilers js:babel-core/register
````
or 
````bash
mocha test/Mail.js --compilers js:babel-core/register
````



<br><br>
## Upcoming
1. full TDD
2. compilation to ES5 using webpack
3. Other services to use as a roulette to send emails
4. Get the roulette mode better when a service fails
5. Refactor some TODOs in the code for a better solution.

