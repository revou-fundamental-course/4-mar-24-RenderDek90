const value_bmi = [18.5, 25.0, 30.0];

var weight = document.getElementById('weight');
var height = document.getElementById('height');
var age = document.getElementById('age');

const formButton = document.getElementById('calculate_button');

var counter = 0;
function updateButtonState() {
  if (counter === 3) {
    formButton.removeAttribute('disabled');
    formButton.style.backgroundColor = '#5cc0de';
  } else {
    formButton.setAttribute('disabled', 'disabled');
    formButton.style.backgroundColor = 'grey';
  }
}

var errorDiv = document.getElementsByClassName('error-div');
// Ready Document
document.addEventListener('DOMContentLoaded', function () {
  updateButtonState();
  console.log(errorDiv);
  // Check Input Value Is Empty Or Not
  weight.addEventListener('change', function (e) {
    if (parseFloat(e.target.value)) {
      counter++;
      console.log(counter);
      errorDiv[0].style.display = 'none';
    } else {
      counter--;
      errorDiv[0].style.display = 'block';
    }
    updateButtonState();
  });

  age.addEventListener('change', function (e) {
    if (parseFloat(e.target.value)) {
      counter++;
      console.log(counter);
      errorDiv[1].style.display = 'none';
    } else {
      counter--;
      errorDiv[1].style.display = 'block';
    }
    updateButtonState();
  });

  height.addEventListener('change', function (e) {
    if (parseFloat(e.target.value)) {
      counter++;
      console.log(counter);
      errorDiv[2].style.display = 'none';
    } else {
      counter--;
      errorDiv[2].style.display = 'block';
    }
    updateButtonState();
  });
});

function resetAllBMI() {
  console.log('reset all');

  height.value = height.value ? '' : '';
  age.value = age.value ? '' : '';
  weight.value = weight.value ? '' : '';

  counter = 0;

  formButton.setAttribute('disabled', 'disabled');
  formButton.style.backgroundColor = 'grey';

  errorDiv[0].style.display = 'none';
  errorDiv[1].style.display = 'none';
  errorDiv[2].style.display = 'none';
  return;
}

function calculationBMI(weight, height) {
  var bmi = weight / (height * height);
  var bmi_floor = Math.floor(bmi);
  var bmi_round = Math.floor(bmi + 1);

  return [bmi, bmi_floor, bmi_round];
}

function categoryBMI(bmi) {
  var categories = ['Kurang', 'Normal', 'Lebih', 'Obesitas'];

  if (bmi < value_bmi[0]) {
    return 'Berat Badan ' + categories[0];
  }

  if (bmi >= value_bmi[0] && bmi < value_bmi[1]) {
    return 'Berat Badan ' + categories[1];
  }

  if (bmi >= value_bmi[1] && bmi < value_bmi[2]) {
    return 'Berat Badan ' + categories[2];
  }

  if (bmi >= value_bmi[2]) {
    return 'Berat Badan ' + categories[3];
  }

  return 'Tidak tercatat dalam BMI :)';
}

function calculateBMI() {
  console.log('Calculate BMI...');
  weight = parseFloat(weight.value);
  height_meter = parseFloat(height.value) / 100;

  var result = calculationBMI(weight, height_meter);
  var message = categoryBMI(result[0]);

  document.getElementById('bmi-category').innerHTML = message;
  document.getElementById('bmi-result').innerHTML = result[0].toFixed(2);

  if (message.includes('Tidak')) {
    document.getElementById('bmi-message-res').innerHTML = message.toLowerCase();
  } else {
    document.getElementById('bmi-message-res').innerHTML = 'Anda memiliki ' + message.toLowerCase();
  }

  document.getElementById('bmi-result-2').innerHTML = `Hasil BMI diantara ${result[1]} dan ${result[2]}`;
}
