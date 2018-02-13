/**
 * Created by www.Alga.me on 13/2/18.
 */

import MailGun from './MailGun'

export default class MailService {
    constructor(props = {}) {
        this.props = props;

        if(!this.props.env) {
            throw new Error('Env variables are required /env.json');
        }

        if(!this.props.services || this.props.services.length === 0) {

        }
    }
}
