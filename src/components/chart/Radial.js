import Chart from 'react-apexcharts';

const Radial = ({ data, labels, height }) => {
  var options = {
    chart: {
      type: 'radialBar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: '#f6f6f6',
          startAngle: -135,
          endAngle: 135,
          strokeWidth: '97%'
        },
        hollow: {
          margin: 0,
          size: '80%'
        },

        dataLabels: {
          showOn: 'always',
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '13px'
          },
          value: {
            color: '#111',
            fontSize: '30px',
            show: true
          }
        }
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels
  };

  return (
    <div id="chart">
      <Chart options={options} series={data} type={options.chart.type} height={height} />
    </div>
  );
};
export default Radial;
