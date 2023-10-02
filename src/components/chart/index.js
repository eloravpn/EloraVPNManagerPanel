import Chart from 'react-apexcharts';

const ChartJs = ({ data, height }) => {
  const state = {
    series: data.data,
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: data.labels
      },
      yaxis: {},
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return ' ' + val + ' Gb';
          }
        }
      }
    }
  };

  return (
    <div id="chart">
      <Chart options={state.options} series={state.series} type="bar" height={height} />
    </div>
  );
};
export default ChartJs;
