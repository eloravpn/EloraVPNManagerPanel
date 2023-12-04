import Chart from 'react-apexcharts';

const Mixed = ({ data, height, type, max }) => {
  const state = {
    series: data.data,
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false
      },
      toolbar: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      // title: {
      //   text: 'XYZ - Stock Analysis (2009 - 2016)',
      //   align: 'left',
      //   offsetX: 110
      // },
      xaxis: {
        categories: data.labels
      },
      yaxis: [
        {
          max: max,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              colors: '#008FFB'
            }
          },
          title: {
            text: 'Donwload',
            style: {
              color: '#008FFB'
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          max: max,
          seriesName: 'Income',
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: '#00E396'
          },
          labels: {
            style: {
              colors: '#00E396'
            }
          },
          title: {
            text: 'Upload',
            style: {
              color: '#00E396'
            }
          }
        },
        {
          seriesName: 'Revenue',
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: '#FEB019'
          },
          labels: {
            style: {
              colors: '#FEB019'
            }
          },
          title: {
            text: 'Count',
            style: {
              color: '#FEB019'
            }
          }
        }
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40
      }
    }
  };

  return (
    <div id="chart">
      <Chart options={state.options} series={state.series} type="line" height={height} />
    </div>
  );
};
export default Mixed;
