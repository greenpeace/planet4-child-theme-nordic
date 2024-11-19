import { Chart } from 'chart.js/auto';

let chart;

const colorPalette = [
  '#66CC00',
  '#1F4912',
  '#80D643',
  '#198700',
  '#B9E696',
  '#1C1C1C',
];

const chartTypes = {
  'line': [],
  'bar': ['vertical', 'horizontal'],
  'circle': ['doughnut', 'pie'],
  'scatter': [],
}

const canvasDiv = document.getElementById('chartRender');
const optionDiv = document.getElementById('chartConfig');

const canvas = document.createElement("canvas");
const inputForm = document.createElement("form");
const inputFormLabel = document.createElement("label");
const inputFormText = document.createElement("input");
const chartTypeLabel = document.createElement("label");
const chartTypeSelect = document.createElement("select");
const chartSubTypeSelect = document.createElement("select");
const inputFormButton = document.createElement("input");

inputFormLabel.innerHTML = "Google sheets URL: &ensp;";
inputFormText.setAttribute("type", "text");
inputFormText.setAttribute("value", "https://docs.google.com/spreadsheets/d/e/2PACX-1vSNGu1GlEyRFnXrDp_uA4ETFmqbTsVRnIZoQ8L-4KYQ8BgwUXsVgc4efhnMycncUOwyAvDuCwteSxoK/pubhtml");
chartTypeLabel.innerHTML = "Chart type: &ensp;";
inputFormButton.setAttribute("type", "button");
inputFormButton.setAttribute("value", "Generate Chart");
inputFormButton.onclick = () => generateChart(inputFormText.value);
inputForm.input = "text";

canvasDiv.appendChild(canvas);
optionDiv.appendChild(inputForm);
inputForm.appendChild(inputFormLabel);
inputForm.appendChild(inputFormText);
inputForm.appendChild(chartTypeLabel);
inputForm.appendChild(chartTypeSelect);
inputForm.appendChild(chartSubTypeSelect);
inputForm.appendChild(inputFormButton);

for (const type in chartTypes) {
  chartTypeSelect.options[chartTypeSelect.options.length] = new Option(type, type);
}

updateSubTypes();

chartTypeSelect.onchange = () => {
  updateSubTypes();
}

async function generateChart(sheetURL) {
  let id = extractSheetID(sheetURL);
  if (id) {
    if (chart != null) chart.destroy();
    const delimeter = ",";
    const dataStringArray = await fetchCSV(id);
    const headers = dataStringArray[0].split(delimeter);
    const dataStringNumbers = dataStringArray.slice(1, dataStringArray.length);
    const labels = dataStringNumbers.map((row) => row.split(delimeter)[0]);
    const type = chartTypeSelect.value;
    const subtype = chartSubTypeSelect.value;;
    let typeOptions = chartOptions(type, subtype);
    typeOptions[1].responsive = true;
    chart = new Chart(canvas, {
      type: typeOptions[0],
      data: {
        labels: labels,
        datasets: formatDatasets(extractColumns(dataStringNumbers, delimeter), headers, type),
      },
      options: typeOptions[1],
    });
  } else throw "Invalid sheet URL";
}

//Copied from main theme
const extractSheetID = urlParam => {
  const googleSheetsPattern = /https:\/\/docs\.google\.com\/spreadsheets\/d\/e\/([\w-]+)/;
  const matches = urlParam.match(googleSheetsPattern);
  if (matches !== null) {
    return matches[1];
  }
  return false;
}

function chartOptions(type, subtype) {
  switch (type) {
    case 'line':
      switch (subtype) {
        default:
          return ['line', {
          }]
      }
    case 'bar':
      switch (subtype) {
        case 'horizontal':
          return ['bar', {
            indexAxis: 'y',
            plugins: {
              legend: {
                position: 'right',
              }
            }
          }]
        default /* vertical */:
          return ['bar', {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }];
      }
    case 'circle':
      switch (subtype) {
        case 'pie':
          return ['pie', {
          }]
        default /* doughnut */:
          return ['doughnut', {
          }]
      }
    case 'scatter':
      switch (subtype) {
        default:
          return ['scatter', {
          }]
      }
    default:
      return null;
  }

}

async function fetchCSV(id) {
  const url = "https://docs.google.com/spreadsheets/d/e/" + id + "/pub?output=csv";
  const dataStringArray = await fetch(url).then((csv) => csv.text()).then((csvString) => csvString.split("\r\n"));
  return dataStringArray;
}


function extractColumns(dataString, delimeter) {
  let dataArray = new Array(dataString[0].split(delimeter).length - 1);
  for (let i = 0; i < dataArray.length; i++) {
    dataArray[i] = new Array(dataString.length);
  }
  let row;
  for (let i = 0; i < dataString.length; i++) {
    row = dataString[i].split(delimeter);
    for (let j = 1; j < row.length; j++) {
      dataArray[j - 1][i] = row[j];
    }
  }
  return dataArray;
}

function formatDatasets(dataArray, headers, chartType) {
  let datasets = new Array(dataArray.length);
  for (let i = 0; i < dataArray.length; i++) if (colorPalette.length > i && chartType != 'doughnut') {
    datasets[i] = {
      label: headers[i + 1],
      data: dataArray[i],
      backgroundColor: colorPalette[i],
      borderColor: colorPalette[i]
    }
  } else {
    datasets[i] = {
      label: headers[i + 1],
      data: dataArray[i],
    }
  };
  return datasets;
}

function updateSubTypes() {
  if (inputForm.contains(chartSubTypeSelect)) inputForm.removeChild(chartSubTypeSelect);
  chartSubTypeSelect.options.length = 0;
  if (chartTypes[chartTypeSelect.value].length > 0) {
    if (!inputForm.contains(chartSubTypeSelect) && inputForm.childNodes.length > 0) inputForm.insertBefore(chartSubTypeSelect, inputFormButton);
    for (const subtype in chartTypes[chartTypeSelect.value]) {
      chartSubTypeSelect.options[chartSubTypeSelect.options.length] = new Option(chartTypes[chartTypeSelect.value][subtype], chartTypes[chartTypeSelect.value][subtype]);
    }
  }
}
