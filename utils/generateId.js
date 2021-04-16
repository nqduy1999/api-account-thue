function makeid() {
  var result = [];
  var number = '0123456789';
  var numberLength = number.length;
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var charactersLength = characters.length;
  for (var i = 0; i < 3; i++) {
    result.push(characters.charAt(Math.floor(Math.random() *
      charactersLength)));
  }
  for (var j = 0; j < 2; j++) {
    result.push(number.charAt(Math.floor(Math.random() *
      numberLength)));
  }
  return result.join('');
}

module.exports = makeid;