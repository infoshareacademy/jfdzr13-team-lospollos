export function daysCounter(
  a: string,
  b: string,
  bankHolidaysData: string[]
): number {
  const dayInMilisec: number = 86400000;

  const dayFrom: number = new Date(a).getTime() - dayInMilisec;
  const dayTo: number = new Date(b).getTime();
  const differenceSec: number = (dayTo - dayFrom) / 1000;
  const differenceMin: number = differenceSec / 60;
  const differenceHour: number = differenceMin / 60;
  const differenceDays: number = differenceHour / 24;

  let i: number;
  let j: number;
  let helpVar: number = dayFrom;
  let saturdaySunday: number;
  let counter: number = 0;
  let helpVarDayOff: number;

  for (i = 0; i < differenceDays; i++) {
    helpVar = helpVar + dayInMilisec;
    saturdaySunday = new Date(helpVar).getDay();
    if (!(saturdaySunday === 6 || saturdaySunday === 0)) {
      counter++;
    }

    for (j = 0; j < bankHolidaysData.length; j++) {
      helpVarDayOff = new Date(bankHolidaysData[j]).getTime();
      if (helpVar === helpVarDayOff) {
        counter--;
      }
    }
  }

  return counter;
}