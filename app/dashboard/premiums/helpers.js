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

  // Current Year
  const startDateCurrentYear = new Date(currentDate.getFullYear(), 0, 1);
  const endDateCurrentYear = currentDate;

  // Last Year
  const lastYear = currentDate.getFullYear() - 1;
  const startDateLastYear = new Date(lastYear, 0, 1);
  const endDateLastYear = new Date(
    lastYear,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  // Current Month
  const startDateCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endDateCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Formatting Dates
  const formattedStartDateCurrentYear =
    formatDateToDDMMYYYY(startDateCurrentYear);
  const formattedEndDateCurrentYear = formatDateToDDMMYYYY(endDateCurrentYear);

  const formattedStartDateLastYear = formatDateToDDMMYYYY(startDateLastYear);
  const formattedEndDateLastYear = formatDateToDDMMYYYY(endDateLastYear);

  const formattedStartDateCurrentMonth = formatDateToDDMMYYYY(
    startDateCurrentMonth
  );
  const formattedEndDateCurrentMonth =
    formatDateToDDMMYYYY(endDateCurrentMonth);

  return {
    currentYear: {
      startDate: formattedStartDateCurrentYear,
      endDate: formattedEndDateCurrentYear,
    },
    lastYear: {
      startDate: formattedStartDateLastYear,
      endDate: formattedEndDateLastYear,
    },
    currentMonth: {
      startDate: formattedStartDateCurrentMonth,
      endDate: formattedEndDateCurrentMonth,
    },
  };
}
