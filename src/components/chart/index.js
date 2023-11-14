import Chart from 'react-apexcharts';

const ChartJs = ({ data, height, type }) => {
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
    }
  };

  return (
    <div id="chart">
      <Chart options={state.options} series={state.series} type={type} height={height} />
    </div>
  );
};
export default ChartJs;
