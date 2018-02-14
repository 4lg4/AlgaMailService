/**
 * Created by www.Alga.me on 13/2/18.
 */


export default class MailService {
    constructor(props = {}) {
        this.props = props;

        if(!this.props.env) {
            throw new Error('env variables are required /env.json');
        }

        this.retries = 0;
        this.setServices();
        this._errors = '';
    }

    setServices(){
        this.services = [];
        this.servicesIndex = {};

        for(let key in this.props.env.services) {
            const service = require(`./${key}.js`).default;
            this.servicesIndex[key] = this.services.length;
            this.services.push(
                new service(
                    Object.assign({}, {env: this.props.env}, this.props.env.services[key], this.props.body)
                )
            );
        }
    }


    send(){
        if(this.retries > this.props.env.maxAttempts) {
            throw new Error(`max attempts (${this.props.env.maxAttempts}) executed, check the config file or the connection / ${this._errors}`);
        }

        this.setService();

        return this.service
            .send()
            .catch((err)=>{
                console.error('MailService:send:ERROR');
                console.error(err);
                this._errors += ` / ${err}`;
                this.retries += 1;
                return this.send();
            });
    }


    setService(){
        if(this.props.env.preferred){
            this.service = this.services[this.servicesIndex[this.props.env.preferred]];
            if(this.service) {
                return true;
            }
        }

        const randService = Math.floor(Math.random() * (1 + 1));
        this.service = this.services[randService];
    }
}
