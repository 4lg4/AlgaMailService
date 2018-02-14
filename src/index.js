/**
 * Created by www.Alga.me on 13/2/18.
 */
"use strict";

import env from './env.json'
import MailService from './lib/MailService'

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

const server = http.createServer((req, res)=>{

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
                    res.end(`{
                        "code": 200,
                        "message": "${success}"
                    }`);
                });
        })
        .catch((err)=> {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(`{
                "code": 500,
                "message": "${err}"
            }`);
        });
});

server.listen(process.env.NODE_PORT || 3000, ()=> console.log('running on ', process.env.NODE_PORT || 3000));
