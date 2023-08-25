document.addEventListener("DOMContentLoaded", function() {
  const inputContainer = document.getElementById("inputContainer");
  const outputContainer = document.getElementById("outputContainer");
  const calculateButton = document.getElementById("calculateButton");
  const startTimeInput = document.getElementById("startTime");
  const hourlyPayInput = document.getElementById("hourlyPay");
  const moneySymbolInput = document.getElementById("moneySymbol");
  const earnedAmountElement = document.getElementById("earnedAmount");
  const startTimeDisplayElement = document.getElementById("startTimeDisplay");
  
  let startTime = null;
  let hourlyPay = null;
  
  calculateButton.addEventListener("click", function() {
      const startTimeString = startTimeInput.value;
      hourlyPay = parseFloat(hourlyPayInput.value);
      
      const [startHour, startMinute] = startTimeString.split(":").map(Number);
      const currentDate = new Date();
      startTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          startHour,
          startMinute
      );
      
      const earnedAmount = calculateEarnedAmount(startTime, hourlyPay);
      updateTabTitleAndElement(earnedAmount, startTime);
      
      inputContainer.classList.add("hidden");
      outputContainer.classList.remove("hidden");
      
      updateEarnedAmountInterval = setInterval(updateEarnedAmount, 100);
  });
  
  let updateEarnedAmountInterval = null;
  
  function updateEarnedAmount() {
      if (startTime && hourlyPay) {
          const earnedAmount = calculateEarnedAmount(startTime, hourlyPay);
          updateTabTitleAndElement(earnedAmount, startTime);
      }
  }
  
  function formatTime(date) {
      const options = { hour: "numeric", minute: "2-digit", hour12: true };
      return date.toLocaleTimeString(undefined, options);
  }
  
  function calculateEarnedAmount(startTimestamp, hourlyPay) {
      const currentTime = Date.now();
      const elapsedTimeInMilliseconds = currentTime - startTimestamp;
      const elapsedTimeInHours = elapsedTimeInMilliseconds / (1000 * 60 * 60);
      const earnedAmount = elapsedTimeInHours * hourlyPay;
      return earnedAmount.toFixed(2);
  }
  
  function updateTabTitleAndElement(earnedAmount, startTime) {
      document.title = `+${moneySymbolInput.value}${earnedAmount}`;
      
      earnedAmountElement.textContent = `${moneySymbolInput.value}${earnedAmount}`;
      startTimeDisplayElement.textContent = `${formatTime(startTime)}`;
  }
});
