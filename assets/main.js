document.addEventListener('DOMContentLoaded', function() {
  var digestButton = $('#digest-it');
  var salt = $('#salt');
  var input = $('#input');
  var digestBox = $('#digest');

  // http://stackoverflow.com/questions/14430633/how-to-convert-text-to-binary-code-in-javascript
  function convertToBinary(str) {
      var output = "";
      for (var i=0; i < str.length; i++) {
          output += str[i].charCodeAt(0).toString(2);
      }
      return output;
  }

  digestButton.click( function() {
      var binarySalt = convertToBinary(salt.val());
      var binaryInput = convertToBinary(input.val());
      var xor = String(binarySalt ^ binaryInput);
      digestBox.val(window.Sha256.hash(xor));
  });
});
