if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("SW Registered!");
      console.log(registration);
    })
    .catch((error) => {
      console.log("SW Registration Failed!");
      console.log(error);
    });
}

function getDatesInMonth(year, month) {
  const monthLastDate = new Date(year, month + 1, 0);
  return monthLastDate.getDate();
}

function getPassedYearDates(year, month, monthDatesValue) {
  let totalDays = 0;

  for (let i = 0; i < month; i++) {
    const monthDates = getDatesInMonth(year, i);
    totalDays += monthDates;
  }
  totalDays += monthDatesValue;
  return totalDays;
}

function setTimeSpanText(type, value, padding) {
  document.getElementById(`${type}_span`).textContent = value
    .toString()
    .padStart(padding, "0");
}

function getBar(type) {
  return document.getElementById(`${type}_bar`);
}

function toDecimalPlaces(value, places) {
  str = value.toString();

  if (str.includes(".")) {
    const [part1, part2] = str.split(".");
    return `${part1}.${part2.slice(0, places).padEnd(places, "0")}`;
  } else {
    return `${value}.${"0".repeat(places)}`;
  }
}

function setBarValue(type, value) {
  const bar = getBar(type);
  bar.value = toDecimalPlaces(value, 3);

  const max = bar.max;
  document.getElementById(`${type}_%`).textContent = toDecimalPlaces(
    (value / max) * 100,
    2
  );
}

var debugPrint = true;
const weekDaysMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

window.addEventListener("load", () => {
  window.requestAnimationFrame(step);
});

function step() {
  const now = new Date();

  const year = now.getFullYear(); //(yyyy) 1-indexed
  const months = now.getMonth(); // (0-11)
  const monthDates = now.getDate(); // (1-31)
  const weekDays = now.getDay(); // (0-6)
  const hours = now.getHours(); // (0-23)
  const minutes = now.getMinutes(); // (0-59)
  const seconds = now.getSeconds(); // (0-59)
  const millis = now.getMilliseconds(); // (0-999)

  // yearDates_bar ajustment
  getBar("yearDates").max =
    new Date(year, 2, 0).getDate() == 29 ? 366 : 365;

  // monthDates_bar ajustment
  getBar("monthDates").max = getDatesInMonth(year, months);

  setTimeSpanText("year", year, 4);
  // months_span ajustment
  setTimeSpanText("months", months + 1, 2);
  setTimeSpanText("monthDates", monthDates, 2);
  setTimeSpanText("weekDays", weekDaysMap[weekDays], 3);
  setTimeSpanText("hours", hours, 2);
  setTimeSpanText("minutes", minutes, 2);
  setTimeSpanText("seconds", seconds, 2);
  setTimeSpanText("millis", millis, 3);

  const secondsValue = seconds + millis / 1000;
  const minutesValue = minutes + secondsValue / 60;
  const hoursValue = hours + minutesValue / 60;
  const hoursRatio = hoursValue / 24;
  const weekDaysValue = weekDays + hoursRatio;
  // monthDatesValue ajustment
  const monthDatesValue = monthDates - 1 + hoursRatio;
  const yearDatesValue = getPassedYearDates(
    year,
    months,
    monthDatesValue
  );

  setBarValue("millis", millis);
  setBarValue("seconds", secondsValue);
  setBarValue("minutes", minutesValue);
  setBarValue("hours", hoursValue);
  setBarValue("weekDays", weekDaysValue);
  setBarValue("monthDates", monthDatesValue);
  setBarValue("yearDates", yearDatesValue);

  // DEBUG PRINT ONCE
  if (debugPrint) {
    debugPrint = false;
    console.log(
      `Now: ${now.toString().slice(0, 24)}.${millis}\n\n` +
        ` Year Date: ${yearDatesValue}\n` +
        `         %: ${
          (yearDatesValue / getBar("yearDates").max) * 100
        }\n\n` +
        `Month Date: ${monthDatesValue}\n` +
        `         %: ${
          (monthDatesValue / getBar("monthDates").max) * 100
        }\n\n` +
        `  Week Day: ${weekDaysValue}\n` +
        `         %: ${(weekDaysValue / 7) * 100}\n\n` +
        `      Hour: ${hoursValue}\n` +
        `         %: ${(hoursValue / 24) * 100}\n\n` +
        `   Minutes: ${minutesValue}\n` +
        `         %: ${(minutesValue / 60) * 100}\n\n` +
        `   Seconds: ${secondsValue}\n` +
        `         %: ${(secondsValue / 60) * 100}\n\n` +
        `     Milli: ${millis}\n` +
        `         %: ${(millis / 1000) * 100}`
    );
  }
  window.requestAnimationFrame(step);
}