$(document).ready(function() {
  var number = '',
      operator = '',
      final = '',
      result = '',
      lastOperator = '',
      checkOperator = false,
      allowEquals = false,
      clearAfterEquals = false,
      hasPeriod = false;
  
//Function to clear the screen and all variables
  function clearAll() {
    number = '';
    operator = '';
    lastOperator = '';
    final = '';
    result = '';
    hasPeriod = false;
    checkOperator = false;
    clearAfterEquals = false;
    allowEquals = false;
    $('#history').html('');
    $('#total').html('0');
    $('a').css('background', '');    
  }
  
//Checks if number is longer than 9. If the number is negative, returns 10 characters total. If it is not negative, returns 9 characters total.
  function checkLength(num) {
    if (num[0] === '-') {
      return num.substr(0,10)
    } else if (num.length > 9) {
        return num.substr(0, 9);
    } 
    return num;
  }
  
//Clears everything when C is clicked
  $('#clear').click(function () {
    clearAll();
  });
  
  
//Sets the display to a number. Does not repeat zeros if set to zero. Clears operator on click. Checks number length with checkLength function before displaying.
  $('#numbers a').not('#clear, #dot').click(function() {   
    number += $(this).html();
    operator = '';
    checkOperator = false;
    $('a').css('background', '');
    if ($('#total').html() === '0' && number === '0') {
      number = '';
    } else {
       $('#total').html(checkLength(number));  
    }  
  });
  
//if last pressed button was equals, and next pressed button is a number, clears all. Does not repeat zeroes if first button clicked is a zero.  
 $('#numbers a').not('#clear, #dot').click(function() {
   if (clearAfterEquals) {
     clearAll();
     if ($(this).html() === '0') {
       $('#total').html('0');
     } else {
       number += $(this).html();
       $('#total').html(checkLength(number));
     }
   }
 });
  
//Adds '0.' when called if dot is clicked when the screen is set to zero.
  function zeroDot() {
    number = '0.';
    hasPeriod = true;
    $('#total').html(checkLength(number));    
  }
  
//selects the '.' Doesn't repeat '.' If it is the first button after equals, clears all.
  $('#dot').click(function() {
    if (clearAfterEquals) {
      clearAll();
      zeroDot();
    }
    if (hasPeriod === false) {
      if ($('#total').html() === '0') {
        zeroDot();
      } else if (checkOperator === true) {
          number = '0.';
          $('#total').html(checkLength(number));
          hasPeriod = true;
      } else {
          number += '.';
          hasPeriod = true;
          $('#total').html(checkLength(number));
      }
    }
  });
  
// Set numbers as negative or positive. Converts string to number to do this, then converts back to string so checkLength function works. First checks if the last operator selected was '-', if it was, it will not select.
  
  $('#abs').click(function() {
    if (lastOperator !== '-') {
      var makeInt = parseFloat($('#total').html());
      if (makeInt > 0) {
        var negative = -Math.abs(makeInt);
        number = negative.toString();
        $('#total').html(checkLength(number));
      } else if (makeInt < 0) {
          var positive = Math.abs(makeInt);
          number = positive.toString();
          $('#total').html(checkLength(number));
      }
    }
  });
  
 
//Selects operators. Does not select if set to zero. Clears out first number. stores operator and old number in var final. allows a dot to be added to the new number. 
  $('#operators a').not('#equals, #abs').click(function() {
    if (checkOperator === false) {
      if ($('#total').html() !== '0') {
        operator = $(this).html();
        lastOperator = $(this).html();
        final += number + operator;
        number = '';
        hasPeriod = false;
        checkOperator = true;
        clearAfterEquals = false;
        allowEquals = true;
        $('#history').html(final);
        $('a').css('background', '');
        $(this).css('background', '#019024');
      }
    }
  });
  
//Evaluates numbers. removes selected operator. Does not allow equals to be selected before operator is selected. Prevents a period from being added to the result if it has a period. lastOperator variable is used to allow the result to be switched positive or negative.
  $('#equals').click(function() {
    if (allowEquals === true) {
      if (hasPeriod === false) {
        hasPeriod = true;
      }
      lastOperator = $(this).html();
      final += number;
      console.log(final);
      $('#history').html(final);
      result = eval(final);
      console.log(result);
      operator = '';
      final = '';
      number = result.toString();
      $('a').css('background', '');
      $('#total').html(checkLength(number));
      clearAfterEquals = true;
    }
  });
});



