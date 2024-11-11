import Chart from 'react-apexcharts';

export function BarChart({ chartData, chartOptions }) {
    return (
        <Chart
            options={chartOptions}
            series={chartData}
            type="bar"
            width="100%"
            height="100%"
        />
    );
}
