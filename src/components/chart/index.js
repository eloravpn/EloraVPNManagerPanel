import Chart from 'react-apexcharts';
import { largestElement } from 'utils';

const ChartJs = ({ data, height }) => {
  var dataLabels = {
    enabled: true,
    offsetY: -35,
    formatter: function (val) {
      return val;
    },
    style: {
      fontSize: '14px',
      fontWeight: 100,
      colors: data.type ? ['#fff'] : ['#304758']
    }
  };
  var dataLabelsPie = {
    enabled: true,
    style: {
      fontSize: '14px',
      fontWeight: 100,
      colors: data.type ? ['#fff'] : ['#304758']
    }
  };

  var option = {
    responsive: [
      {
        breakpoint: 600,
        options: {
          xaxis: {
            categories: data?.categories || [],
            labels: {
              style: {
                fontSize: '11px'
              }
            }
          },
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 320,
        options: {
          xaxis: {
            categories: data?.categories || [],
            labels: {
              style: {
                fontSize: '5px'
              }
            }
          },
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    chart: {
      toolbar: {
        show: false
      },
      type: 'bar'
    },
    dataLabels: data.type ? dataLabelsPie : dataLabels,
    plotOptions: {
      bar: {
        columnWidth: '30%',
        distributed: true,
        borderRadius: 5,
        dataLabels: {
          position: 'top' // top, center, bottom
        }
      }
    },

    colors: ['rgb(118,53,220)'],
    grid: {
      borderColor: '#e8eaed',
      strokeDashArray: 3
    },

    xaxis: {
      categories: data?.categories || [],
      labels: {
        style: {
          fontSize: '14px'
        }
      },
      position: 'bottom',
      axisBorder: {
        show: true,
        borderType: 'doted',
        color: '#f6f6f6'
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5
          }
        }
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      min: 0,
      max: largestElement(data?.data).toFixed(0) + 100,
      tickAmount: 5,
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: true
      },
      labels: {
        formatter: function (val) {
          return val;
        }
      }
    },
    labels: data.labels ?? []
  };

  var series = data.type ? [50, 75, 60] : [{ name: data?.name, data: data?.data }];

  return (
    <div id="chart">
      <Chart options={option} series={series} type={data.type || 'bar'} height={height} />
    </div>
  );
};
export default ChartJs;
