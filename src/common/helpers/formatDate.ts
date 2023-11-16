export function formatDate(date: Date): Date {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1; // Months are zero-based
  const day: number = date.getDate();


  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

  const today = `${year}-${formattedMonth}-${formattedDay}`;
  const todayDate = new Date(today);
  return todayDate;
}
