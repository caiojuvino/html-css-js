function getWeeksInMonth(year, month) {
    const monthFirstDate = new Date(year, month, 1);
    console.log(`month: ${month}, year: ${year}`);

    const monthFirstDay = monthFirstDate.getDay();
    const weekCountOn28 = monthFirstDay === 0 ? 4 : 5;

    const monthLastDate = new Date(year, month + 1, 0);
    const datesThisMonth = monthLastDate.getDate();

    console.log(`datesThisMonth: ${datesThisMonth}`);
    const excedingDays = datesThisMonth - 28;

    if (excedingDays === 0) {
      return weekCountOn28;
    } else {
      const twentyEight = new Date(year, month, 28);
      const monthLastDay = twentyEight.getDay() + excedingDays;
      const excedingWeeks = monthLastDay > 6 ? 1 : 0;
      return weekCountOn28 + excedingWeeks;
    }
  }