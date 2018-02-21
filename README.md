# Alga Mail Service


#### Get Started
````bash
npm run install-deps
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

#### Build & run
all compiled files to /dist folder
````bash
npm run build && NODE_PORT=8080 npm run start-prod
````

#### starting service Development
````bash
npm run start-dev
````
or
````bash
NODE_PORT=8080 npm run start-dev
````

#### Testing the service
````
POST https://localhost:3000 
{
	"from": "no-reply@email.com",
	"to": "to@email.com",
	"cc": ["cc1@email.com", "cc2@email.com"],
	"subject": "The Subject",
	"text": "text email part",
	"html": "<div style='color:red;'>HTML</div>"
}      
````


#### Docker
build docker image
````bash
npm run docker-build
````
start docker image on port 8080
````bash
npm run docker-start
````

build and run (after finished just open localhost:8080)
````bash
npm run build && npm run build-docker && npm run start-docker
````

##### interface + api running on localhost:8080
##### api running on api.localhost:8080


<br><br><br><br><br><br>
#### Tests
not all tests implemented :P
````bash
npm run test
````


#### starting service Development
````bash
npm run start-prod
````
or
````bash
NODE_PORT=9999 npm run start-prod
````


<br><br>
## Upcoming
1. full TDD
2. replace gulp to webpack
3. Other services to use as a roulette to send emails
4. Get the roulette mode better when a service fails
5. Refactor some TODOs in the code for a better solution.

