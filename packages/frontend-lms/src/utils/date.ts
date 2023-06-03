export const formatDate = (input: string): string => {
  const split = input.split("/");
  const formattedDay = [split[1], split[0], split[2]].join("/");
  return formattedDay;
};

//------------------------------------------------------
export const diffDay = (inputDay: string): number => {
  const today = new Date().toLocaleDateString();
  const todayFormatted = formatDate(today);
  const inputDateFormatted = formatDate(inputDay);

  const day1 = new Date(todayFormatted);
  const day2 = new Date(inputDateFormatted);
  const diffTime  = Math.abs(day2 - day1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) ?? 0;
  return diffDays;
};
