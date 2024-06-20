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

