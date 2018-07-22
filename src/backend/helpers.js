const isEmailAddressValid = (email) => !!(email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));

const checkDuplicationInArray = (array) => {
  if (!array || (!(array instanceof Array))) {
    return [];
  }

  return array.filter((elem, index, self)=> index !== self.indexOf(elem));
};

module.exports = {isEmailAddressValid, checkDuplicationInArray};
