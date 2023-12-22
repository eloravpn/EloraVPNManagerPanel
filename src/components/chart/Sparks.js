import Chart from 'react-apexcharts';

const Sparks = ({ data, height, type }) => {
  const state = {
    series: [
      {
        data: [20, 25, 50, 64, 50]
      }
    ],
    chart: {
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 0.3
    },
    yaxis: {
      min: 0
    },
    colors: ['#FEB019']
  };

  return (
    <div id="chartSparks">
      <Chart options={state} series={state.series} type={'area'} height={height} />
    </div>
  );
};
export default Sparks;
