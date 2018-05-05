$(document).ready(function() {
  let input = ''
  let current = ''
  let toNum = ''
  let operator = false
  let lastNum = ''
  let lastOperator = ''
  let decimal = false
  let hiddenEq = false
  let equalsLastPressed = false
  let evaluated
  

  const clearAll = () => {
    input = ''
    current = ''
    toNum = ''
    lastNum = ''
    lastOperator = ''
    operator = false
    decimal = false
    hiddenEq = false
    evaluated = '';
    $('#total').html('0')
    console.log('cleared') 
  }

  const hiddenEquals = (a,b,c) => eval(`${a} ${b} ${c}`)

  const validEquals = () => {
    const ops = ['+', '-', '*', '/', '='];
    const newArr = (current + input).split('').map(item => ops.indexOf(item))
    
    if (newArr[newArr.length - 1] < 0) {
      if (newArr.every(item => item < 0)) {
        return false
      }
      return true
    }
    return false
  }

  // const checkLength = (num) => {
  //   if (num[0] === '-') {
  //     return num.substr(0,10)
  //   } else if (num.length > 9) {
  //       return num.substr(0, 9);
  //   } 
  //   return num;
  // }

  $('#clear').click(function() {
    clearAll()
  })
  
  $('.digit').click(function() {
    operator = false
    input += $(this).html()
    console.log(input)
    $('#total').html(input)
  })

  $('#zero').click(function() {
    if (input) {
      input += $(this).html()
      $('#total').html(input)
      console.log(input)
    }
  })

  $('#decimal').click(function() {
    if (!decimal) {
      if (!input) {  
        input += '0' + $(this).html()
        $('#total').html(input)
      }
      else {
        input += $(this).html()
        $('#total').html(input)
        console.log(input)
      }
    }
    decimal = true;
  })

  $('.opr').click(function() {
    hiddenEq = false
    if (!operator && input) {
      current += input + $(this).html()
      lastOperator = $(this).html()
      input = ''
      decimal = false
      console.log(current)
    }
    operator = true
  })

  $('#abs').click(function() {
    if (input) {
      input > 0 ? input = `-${input}` : input = Math.abs(input)
      $('#total').html(input)
    }
  })

  $('#equals').click(function() {
    if (input && !hiddenEq && validEquals()) {
      current += input
      lastNum = input
      evaluated = eval(current)
      console.log(eval(current))
      $('#total').html(evaluated)
      input = evaluated
      evaluated = ''
      current = ''
      hiddenEq = true
      equalsLastPressed = true
    }
    else if (hiddenEq) {
      input = hiddenEquals(input,lastOperator,lastNum)
      $('#total').html(input)
      equalsLastPressed = true
    }
  })

  $('#numbers a').not('#clear').click(function() {
    if (equalsLastPressed) {
      clearAll()
      input = $(this).html()
      $('#total').html(input)
    }
    hiddenEq = false

    if ($(this).html() === '.'  && equalsLastPressed) {
      clearAll();
      input += '0' + $(this).html()
      decimal = true
      $('#total').html(input)
    }
    equalsLastPressed = false
  })

  


})