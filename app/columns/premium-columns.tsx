import { calculatePercentage } from '../dashboard/premiums/helpers'
import { formatDate } from '../utils/apiLogistics'

export const columnsKE = [
  {
    title: 'Policy No',
    dataIndex: 'policyNo',
    key: 'policyNo',
  },
  {
    title: 'Endorsement No',
    dataIndex: 'endNo',
    key: 'endNo',
  },
  {
    title: 'Insured',
    dataIndex: 'insured',
    key: 'insured',
  },
  {
    title: 'Sum Insured',
    dataIndex: 'sumInsured',
    key: 'sumInsured',
  },
  {
    title: 'Issue Date',
    dataIndex: 'issueDate',
    key: 'issueDate',
    render: (_: any, item: any) => <p> {formatDate(item.issueDate)}</p>,
  },
  {
    title: 'Start Date',
    dataIndex: 'start',
    key: 'start',
    render: (_: any, item: any) => <p> {formatDate(item.start)}</p>,
  },
  {
    title: 'Expiry Date',
    dataIndex: 'expiry',
    key: 'expiry',
    render: (_: any, item: any) => <p> {formatDate(item.expiry)}</p>,
  },
  {
    title: 'Premiums',
    dataIndex: 'premiums',
    key: 'premiums',
    render: (_: any, item: any) => <p> {item.premiums?.toLocaleString()}</p>,
  },
  {
    title: 'EarthQuake',
    dataIndex: 'earthQuake',
    key: 'earthQuake',
    render: (_: any, item: any) => <p> {item.earthQuake?.toLocaleString()}</p>,
  },
  {
    title: 'PVT Premium',
    dataIndex: 'PVTPremium',
    key: 'PVTPremium',
    render: (_: any, item: any) => <p> {item.PVTPremium.toLocaleString()}</p>,
  },
  {
    title: 'Stamp Duty',
    dataIndex: 'stampDuty',
    key: 'stampDuty',
    render: (_: any, item: any) => <p> {item.stampDuty.toLocaleString()}</p>,
  },
  {
    title: 'PHC Fund',
    dataIndex: 'PHCFund',
    key: 'PHCFund',
    render: (_: any, item: any) => <p> {item.PHCFund.toLocaleString()}</p>,
  },
  {
    title: 'Training Levt',
    dataIndex: 'trainingLevy',
    key: 'trainingLevy',
    render: (_: any, item: any) => <p> {item.trainingLevy.toLocaleString()}</p>,
  },
  {
    title: 'PTA Charge',
    dataIndex: 'PTACharge',
    key: 'PTACharge',
    render: (_: any, item: any) => <p> {item.PTACharge.toLocaleString()}</p>,
  },
  {
    title: 'AA Charge',
    dataIndex: 'AACharge',
    key: 'AACharge',
    render: (_: any, item: any) => <p> {item.AACharge.toLocaleString()}</p>,
  },
  {
    title: 'Broker Comm',
    dataIndex: 'brokerComm',
    key: 'brokerComm',
    render: (_: any, item: any) => <p> {item.brokerComm.toLocaleString()}</p>,
  },
  {
    title: 'Withholding Tax',
    dataIndex: 'witholdingTax',
    key: 'witholdingTax',
    render: (_: any, item: any) => (
      <p> {item.witholdingTax.toLocaleString()}</p>
    ),
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
    render: (_: any, item: any) => <p> {calculatePercentage(item)}%</p>,
  },
  {
    title: 'Net Premium',
    dataIndex: 'netPrem',
    key: 'netPrem',
    render: (_: any, item: any) => <p> {item.netPrem.toLocaleString()}</p>,
  },
]

export const columnsZambia = [
  {
    title: 'Policy No',
    dataIndex: 'policyNo',
    key: 'policyNo',
  },
  {
    title: 'Endorsement No',
    dataIndex: 'endNo',
    key: 'endNo',
  },
  {
    title: 'Insured',
    dataIndex: 'insured',
    key: 'insured',
  },
  {
    title: 'Sum Insured',
    dataIndex: 'sumInsured',
    key: 'sumInsured',
  },
  {
    title: 'Issue Date',
    dataIndex: 'issueDate',
    key: 'issueDate',
    render: (_: any, item: any) => <p> {formatDate(item.issueDate)}</p>,
  },
  {
    title: 'Start Date',
    dataIndex: 'start',
    key: 'start',
    render: (_: any, item: any) => <p> {formatDate(item.start)}</p>,
  },
  {
    title: 'Expiry Date',
    dataIndex: 'expiry',
    key: 'expiry',
    render: (_: any, item: any) => <p> {formatDate(item.expiry)}</p>,
  },
  {
    title: 'Premiums',
    dataIndex: 'premiums',
    key: 'premiums',
    render: (_: any, item: any) => <p> {item.premiums?.toLocaleString()}</p>,
  },

  {
    title: 'Training Levy',
    dataIndex: 'trainingLevy',
    key: 'trainingLevy',
    render: (_: any, item: any) => <p> {item.trainingLevy.toLocaleString()}</p>,
  },
  {
    title: 'Broker Comm',
    dataIndex: 'brokerComm',
    key: 'brokerComm',
    render: (_: any, item: any) => <p> {item.brokerComm.toLocaleString()}</p>,
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
    render: (_: any, item: any) => <p> {calculatePercentage(item)}%</p>,
  },
  {
    title: 'Net Premium',
    dataIndex: 'netPrem',
    key: 'netPrem',
    render: (_: any, item: any) => <p> {item.netPrem.toLocaleString()}</p>,
  },
]
