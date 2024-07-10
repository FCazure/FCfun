// animate.js
function animateValueChange(newValue) {
  let teamValueNumber = $('#team-value-number');
  teamValueNumber.countTo({
    from: parseFloat(teamValueNumber.text().replace(/,/g, '')),
    to: newValue,
    formatter: function (value, options) {
      return value.toFixed(options.decimals).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
  });
}
