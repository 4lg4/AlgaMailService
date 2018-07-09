const isEmailAddressValid = (email) => !!(email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));

const checkDuplicationInArray = (a, b) => {
  if (!a || !b || (!(a instanceof Array)) || (!(a instanceof Array))) {
    return [];
  }

  return a.filter((aa) => !!b.find((bb) => bb === aa));
};

module.exports = {isEmailAddressValid, checkDuplicationInArray};
