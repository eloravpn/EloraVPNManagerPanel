import Chart from 'react-apexcharts';

const Bar = ({ data, height, width, type, sparkline }) => {
  const state = {
    series: data.data,
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.2
      }
    },
    options: {
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: 'public-sans-bold'
        }
      },
      colors: ['#ffab00', '#7635dc', '#546E7A', '#E91E63', '#FF9800'],
      chart: {
        sparkline: {
          enabled: sparkline
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      grid: {
        strokeDashArray: 2,
        row: {
          colors: ['transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: data.labels
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px'
          },
          value: {
            formatter: function (val) {
              return parseInt(val);
            },
            color: '#111',
            fontSize: '36px',
            show: true
          }
        }
      }
    }
  };

  return (
    <div id="chart">
      <Chart
        options={state.options}
        series={state.series}
        type={type}
        height={height}
        width={width}
      />
    </div>
  );
};
export default Bar;
