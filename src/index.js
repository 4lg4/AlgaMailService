/**
 * Created by www.Alga.me on 13/2/18.
 */
"use strict";

import env from './env.json'
import MailService from './lib/MailService'

import fs from 'fs'
import path from 'path'
import http from 'http'

// log unhandled promise rejection
process.on('unhandledRejection', (reason) => {
    console.error('unhandledRejection');
    console.error(reason);
    return true;
});

const parseBody = (req)=>{
    let body = [];
    return new Promise((resolve,reject)=>{
        req
            .on('data', (chunk) => body.push(chunk))
            .on('end', () => {
                try {
                    body = Buffer.concat(body).toString();
                    resolve(body);
                } catch(e){
                    reject("Valid JSON payload is required");
                }
            })
            .on('error', (err) => reject(err));
    }).then(()=>{
        try {
            return JSON.parse(body);
        } catch(e){
            throw new Error("Valid JSON payload is required");
        }
    })
};

const staticCall = (req,res)=>{
    // Tailor made solution to serve the frontend files
    const types ={
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '': 'text/html'
    };

    let file = `${__dirname}/frontend${req.url}`;
    if (req.url === "/") {
        file = `${__dirname}/frontend${req.url}index.html`;
    }

    return new Promise((resolve,reject)=> {
        fs.readFile(file, function (err, data) {
            if (err) {
                console.error(err);
                return reject('Frontend missing :s');
            }

            resolve(data);
        });
    }).then((data)=>{
        res.writeHead(200, {'Content-Type': types[path.extname(file)]});
        res.write(data);
        res.end();
    });
};

const apiCall = (req,res)=>{
    return parseBody(req)
        .then((body)=>{

            if(req.method !== "POST") {
                res.writeHead(405, {'Content-Type': 'application/json'});
                res.end(`{
                            "code": 405,
                            "message": "Method Not Allowed"
                        }`);

                return true;
            }

            const algaMail = new MailService({
                env,
                body
            });

            return algaMail.send()
                .then((success)=>{
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({
                        "code": 200,
                        "message": success
                    }));
                });
        });
};

const server = http.createServer((req, res)=>{
    return Promise
        .resolve()
        .then(()=>{
            // test minimal service configuration
            if(env.services && !Object.keys(env.services)[0].url){
                res.writeHead(500, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({
                    "code": 500,
                    "message": 'Verify the env config file of the backend'
                }));
            }

            // TODO: change this validation to regex more accurated
            if(req.headers.host.indexOf('api.') === -1) {
                return staticCall(req,res);
            }

            return apiCall(req,res);
        })
        .catch((err)=> {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                "code": 500,
                "message": err
            }));
        });
});

server.listen(process.env.NODE_PORT || 3000, ()=> console.log('running on ', process.env.NODE_PORT || 3000));
