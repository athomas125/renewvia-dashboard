const contracts = require("../data/contracts.json");

const parseTransactionData = (contracts, action) => {
  const labels = [];
  const data = [];
  const backgroundColor = [];

  // Define a color mapping for each contract
  const colorMapping = {
    'Alabama R-REC': '#ebb660',
    'Colorado R-REC': '#be9f8f',
    'Georgia R-REC': '#7b7475',
    'North Carolina R-REC': 'black',
    'South Carolina R-REC': '#909292',
    'Texas R-REC': '#20698a',
    'Virginia R-REC': '#0f9d58',
    'Chad R-REC': '#b8b8b8',
    'Zambia R-REC': '#ccbcb6',
    'Colorado Xcel REC': '#4cad2a',
    'Renewgen Conservation Carbon Credit': '#f06300',
    'Mini-Grid Carbon Credit': '#049fdb',
    'AVERT-US Carbon Credit': '#963503',
    'Ember Grid Reduction Carbon Credit': 'purple',
    'Biochar Carbon Dioxide Removal Credits': '#ebb660'
  };

  contracts.forEach((contract) => {
    const total = contract.transactions
      .filter((transaction) => transaction.action === action)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    if (total > 0) {
      labels.push(contract.name);
      data.push(total);
      // Use the predefined color for each contract
      backgroundColor.push(colorMapping[contract.name] || '#000000'); // Default to black if no color is defined
    }
  });

  return { labels, data, backgroundColor };
};
// ##############################
// // // Chart Data
// #############################

// #########################################
// Minted Pie Chart
// #########################################

const mint = parseTransactionData(
  contracts,
  "mint"
);

const chartMint = {
  data: {
    labels: mint.labels,
    datasets: [
      {
        label: "Minted Amounts",
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: mint.backgroundColor,
        borderWidth: 0,
        data: mint.data,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: true,
      },
      tooltips: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  },
};

// #########################################
// Retire Pie Chart
// #########################################

const retire = parseTransactionData(
  contracts,
  "retire"
);

const chartRetire = {
  data: {
    labels: retire.labels,
    datasets: [
      {
        label: "Retired Amounts",
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: retire.backgroundColor,
        borderWidth: 0,
        data: retire.data,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: true,
      },
      tooltips: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  },
};

// #########################################
// Return Pie Chart
// #########################################

const returnChart = parseTransactionData(
  contracts,
  "return"
);

const chartReturn = {
  data: {
    labels: returnChart.labels,
    datasets: [
      {
        label: "Returned Amounts",
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: returnChart.backgroundColor,
        borderWidth: 0,
        data: returnChart.data,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: true,
      },
      tooltips: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  },
};

// #########################################
// Transfer Pie Chart
// #########################################

const transfer = parseTransactionData(
  contracts,
  "transfer"
);

const chartTransfer = {
  data: {
    labels: transfer.labels,
    datasets: [
      {
        label: "Transfered Amounts",
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: transfer.backgroundColor,
        borderWidth: 0,
        data: transfer.data,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: true,
      },
      tooltips: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  },
};

module.exports = {
  chartMint,
  chartTransfer,
  chartRetire,
  chartReturn,
};
