import Chart from 'react-apexcharts';

const Radial = ({ data, labels, height, sparkline, width }) => {
  var options7 = {
    labels,
    chart: {
      type: 'radialBar',
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 0,
          size: '80%'
        },
        track: {
          margin: 0,
          background: '#f6f6f6',
          startAngle: -135,
          endAngle: 135,
          strokeWidth: '97%'
        },
        dataLabels: {
          show: false
        }
      }
    }
  };
  var options = {
    chart: {
      type: 'radialBar',
      sparkline: {
        enabled: sparkline
      },
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
      <Chart
        options={options7}
        series={data}
        type={options.chart.type}
        height={height}
        width={width}
      />
    </div>
  );
};
export default Radial;
