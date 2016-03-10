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

  function padWithZeros(numberToPad, endLength) {
      while (numberToPad.length < endLength) {
          numberToPad += "0";
      }
      return numberToPad;
  }

  // Split a string into chunks of four
  function splitToPieces(string) {
      var container = [];
      while (string.length > 0) {
          container.push(string.slice(0, 4));
          string = string.slice(4, string.length);
      }
      return container;
  }

  function largeXor(numberOne, numberTwo) {
      var fullXor = "";
      if (numberOne.length < numberTwo.length) {
          numberOne = padWithZeros(numberOne, numberTwo.length);
      } else {
          numberTwo = padWithZeros(numberTwo, numberOne.length);
      }
      var arrOne = splitToPieces(numberOne);
      var arrTwo = splitToPieces(numberTwo);

      for (var i = 0; i < arrOne.length; i++) {
          fullXor += String(Number(arrOne[i]) ^ Number(arrTwo[i]));
      }

      return fullXor;
  }

  digestButton.click( function() {
      var binarySalt = convertToBinary(salt.val());
      var binaryInput = convertToBinary(input.val());
      var xor = largeXor(binarySalt, binaryInput);
      digestBox.val(window.Sha256.hash(xor));
  });
});
