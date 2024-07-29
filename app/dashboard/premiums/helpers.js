export const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const calculatePercentage = (item) => {
  const withholdingTax = item.withholdingTax;
  const brokerComm = item.brokerComm;

  if (
    brokerComm === 0 ||
    brokerComm == null ||
    withholdingTax == null ||
    withholdingTax == 0
  ) {
    return 0;
  }

  const result = (withholdingTax / brokerComm) * 100;

  return isNaN(result) ? 0 : result;
};

function formatDateToDDMMYYYY(date) {
  let day = date.getDate().toString().padStart(2, "0");
  let month = date.getMonth();
  let year = date.getFullYear();

  return `${day}-${Months[month]}-${year}`;
}

export function getDates() {
  const currentDate = new Date();
  const startDateCurrentYear = new Date(currentDate.getFullYear(), 0, 1);
  const endDateCurrentYear = currentDate;

  const lastYear = currentDate.getFullYear() - 1;
  const startDateLastYear = new Date(lastYear, 0, 1);
  const endDateLastYear = new Date(
    lastYear,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const formattedStartDateCurrentYear =
    formatDateToDDMMYYYY(startDateCurrentYear);
  const formattedEndDateCurrentYear = formatDateToDDMMYYYY(endDateCurrentYear);

  const formattedStartDateLastYear = formatDateToDDMMYYYY(startDateLastYear);
  const formattedEndDateLastYear = formatDateToDDMMYYYY(endDateLastYear);

  return {
    currentYear: {
      startDate: formattedStartDateCurrentYear,
      endDate: formattedEndDateCurrentYear,
    },
    lastYear: {
      startDate: formattedStartDateLastYear,
      endDate: formattedEndDateLastYear,
    },
  };
}
