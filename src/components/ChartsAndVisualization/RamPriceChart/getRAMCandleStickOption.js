import { format } from 'date-fns';
import numeral from 'numeral';

const upColor = '#FD1050';
const upBorderColor = '#FD1050';
const downColor = '#00B3A4';
const downBorderColor = '#00B3A4';

function splitData(rawData) {
  return {
    categoryData: rawData.map(({ time }) => format(time, 'MM-DD HH:mm:ss')),
    values: rawData.map(({ open, close, lowest, highest }) => [open, close, lowest, highest]),
  };
}

function calculateMA(data, dayCount) {
  const result = [];
  for (let i = 0, len = data.values.length; i < len; i += 1) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j += 1) {
      sum += data.values[i - j][1];
    }
    result.push(sum / dayCount);
  }
  return result;
}

export default function getRAMCandleStickOption(rawData) {
  const data = splitData(rawData);
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: ['K', 'MA5', 'MA10', 'MA20', 'MA30'],
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%',
    },
    xAxis: {
      type: 'category',
      data: data.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax',
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true,
      },
    },
    dataZoom: [
      {
        show: true,
        type: 'slider',
      },
    ],
    series: [
      {
        name: 'K',
        type: 'candlestick',
        data: data.values,
        itemStyle: {
          normal: {
            color: upColor,
            color0: downColor,
            borderColor: upBorderColor,
            borderColor0: downBorderColor,
          },
        },
        markPoint: {
          label: {
            normal: {
              formatter(param) {
                return numeral(param.value).format('0.00');
              },
            },
          },
          data: [
            {
              name: 'XX标点',
              coord: ['2013/5/31', 2300],
              value: 2300,
              itemStyle: {
                normal: { color: 'rgb(41,60,85)' },
              },
            },
            {
              name: 'highest value',
              type: 'max',
              valueDim: 'highest',
            },
            {
              name: 'lowest value',
              type: 'min',
              valueDim: 'lowest',
            },
            {
              name: 'average value on close',
              type: 'average',
              valueDim: 'close',
            },
          ],
          tooltip: {
            formatter(param) {
              return `${param.name}<br>${param.data.coord || ''}`;
            },
          },
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [
            [
              {
                name: 'from lowest to highest',
                type: 'min',
                valueDim: 'lowest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  normal: { show: false },
                  emphasis: { show: false },
                },
              },
              {
                type: 'max',
                valueDim: 'highest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  normal: { show: false },
                  emphasis: { show: false },
                },
              },
            ],
            {
              name: 'min line on close',
              type: 'min',
              valueDim: 'close',
            },
            {
              name: 'max line on close',
              type: 'max',
              valueDim: 'close',
            },
          ],
        },
      },
      {
        name: 'MA5',
        type: 'line',
        data: calculateMA(data, 5),
        smooth: true,
        lineStyle: {
          normal: { opacity: 0.5 },
        },
      },
      {
        name: 'MA10',
        type: 'line',
        data: calculateMA(data, 10),
        smooth: true,
        lineStyle: {
          normal: { opacity: 0.5 },
        },
      },
      {
        name: 'MA20',
        type: 'line',
        data: calculateMA(data, 20),
        smooth: true,
        lineStyle: {
          normal: { opacity: 0.5 },
        },
      },
      {
        name: 'MA30',
        type: 'line',
        data: calculateMA(data, 30),
        smooth: true,
        lineStyle: {
          normal: { opacity: 0.5 },
        },
      },
    ],
  };
}
