const {post} = require('./alga-request');
const {isEmailAddressValid, checkDuplicationInArray} = require('./helpers');

const logIt = (...vars)=> {
  if (process.env.NODE_ENV === 'test' || process.env.DEBUG) {
    console.log(...vars);
  }
};

const generateEmailList = (list, unique) => {
  const generatedList = [];
  if (!(list instanceof Array)) {
    list = [list];
  }

  for (let i = 0; list.length > i; i++) {
    if (!isEmailAddressValid(list[i])) {
      return false;
    }
    generatedList.push({'email': list[i]});
  }

  return generatedList;
};

const send = ({url = process.env.SERVICES_SENDGRID_URL, from = process.env.FROM, auth = process.env.SERVICES_SENDGRID_AUTH, subject, to, cc, bcc, html, text}) => {
  if (!url || !auth || !from) {
    throw new Error('Service SendGrid: from, url and auth are required, see README for more info');
  }

  const personalizations = [{}];

  if (to) {
    personalizations[0].to = generateEmailList(to);
    if (!personalizations[0].to) {
      throw new Error('to should be a string or an Array of strings');
    }
  }

  if (cc) {
    personalizations[0].cc = generateEmailList(cc);
    if (!personalizations[0].cc) {
      throw new Error('cc should be an email string or an Array of email strings');
    }
  }

  if (bcc) {
    personalizations[0].bcc = generateEmailList(bcc);
    if (!personalizations[0].bcc) {
      throw new Error('bcc should be an email string or an Array of email strings');
    }
  }

  if (!to || !subject || (!text && !html)) {
    throw new Error('to, subject, text / html are required');
  }

  const duplicates = checkDuplicationInArray(to.concat(cc || []).concat(bcc || []));
  if (duplicates.length > 0) {
    throw new Error(`to, cc, bcc email addresses should be unique. Duplicates: ${duplicates.toString()}`);
  }

  const content = [{
    type: 'text/plain',
    value: text || html,
  }];

  // TODO: verify if this option exists
  if (html) {
    content.push({
      type: 'text/html',
      value: html,
    });
  }

  const options = {
    json: true,
    body: {
      personalizations,
      from: {'email': from},
      subject: (process.env.DEBUG) ? `[SendGrid][${new Date().getTime()}] ${subject}` : subject,
      content,
    },
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  if (process.env.DEBUG) {
    logIt(options);
  }

  if (process.env.FAKE_IT) {
    return options;
  }

  return post(options);
};

module.exports = {send};
