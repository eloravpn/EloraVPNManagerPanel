import Chart from 'react-apexcharts';

const Mixed = ({ data, height, type, max, width, count = false, isLoading = true }) => {
  const state = {
    series: data.data,
    options: {
      chart: {
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
        height: 350,
        type: 'line',
        stacked: false
      },
      noData: {
        text: isLoading ? 'Loading...' : 'No Data present in the graph!',
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          color: '#000000',
          fontSize: '14px',
          fontFamily: 'Helvetica'
        }
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
      xaxis: {
        categories: data.labels
      },
      yaxis: [
        {
          max: max + 0.5,
          min: 0,
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
            text: 'Donwload / Upload',
            style: {
              color: '#008FFB'
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          max: max + 0.5,
          min: 0,
          seriesName: 'Income',
          opposite: true,
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          },
          labels: {
            show: false
          }
        },
        ...(count
          ? [
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
            ]
          : [])
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
        horizontalAlign: 'left'
      }
    }
  };

  return (
    <div id="chart">
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        height={height}
        width={width}
      />
    </div>
  );
};
export default Mixed;
