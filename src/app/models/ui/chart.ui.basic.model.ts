import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

export class ChartUiBasicModel {
    chartData: ChartDataSets[];
    chartLabels: Label[];
    chartOptions: any;
    chartColors: Color[];
    chartLegend: boolean;
    chartPlugins: any[];
    chartType: string;

    static getBasicPieChart(labels: string[], chartInputData: number[]) {
        let pieChartUiBasicModel: ChartUiBasicModel = new ChartUiBasicModel();
        pieChartUiBasicModel.chartData = [
            { data: chartInputData, label: 'chartLabel' }
        ];
        pieChartUiBasicModel.chartLabels = labels;
        pieChartUiBasicModel.chartOptions = { responsive: true };
        pieChartUiBasicModel.chartColors = [];
        pieChartUiBasicModel.chartLegend = true;
        pieChartUiBasicModel.chartPlugins = [];
        pieChartUiBasicModel.chartType = 'pie';
        return pieChartUiBasicModel;
    }

    static getBasicRadarChart(labels: string[], chartInputData: number[], chartLabel: string) {
        let radarChartUiBasicModel: ChartUiBasicModel = new ChartUiBasicModel();
        radarChartUiBasicModel.chartData = [
            { data: chartInputData, label: chartLabel }
        ];
        radarChartUiBasicModel.chartLabels = labels;
        radarChartUiBasicModel.chartOptions = { responsive: true };
        radarChartUiBasicModel.chartColors = [];
        radarChartUiBasicModel.chartLegend = true;
        radarChartUiBasicModel.chartPlugins = [];
        radarChartUiBasicModel.chartType = 'radar';
        return radarChartUiBasicModel;
    }

    static getBasicMultiLineChart(dataset: ChartDataSets[], yLabels: string[]) {
        let multiChartUiBasicModel: ChartUiBasicModel = new ChartUiBasicModel();
        multiChartUiBasicModel.chartData = dataset;
        multiChartUiBasicModel.chartLabels = yLabels;
        multiChartUiBasicModel.chartOptions = {
            responsive: true
        };
        multiChartUiBasicModel.chartColors = [];
        multiChartUiBasicModel.chartLegend = true;
        multiChartUiBasicModel.chartPlugins = [];
        multiChartUiBasicModel.chartType = 'line';
        return multiChartUiBasicModel;
    }
}