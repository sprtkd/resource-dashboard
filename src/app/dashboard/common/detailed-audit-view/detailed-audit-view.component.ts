import { Component, OnInit } from '@angular/core';
import { ChartUiBasicModel } from 'src/app/models/ui/chart.ui.basic.model';


@Component({
  selector: 'app-detailed-audit-view',
  templateUrl: './detailed-audit-view.component.html',
  styleUrls: ['./detailed-audit-view.component.css']
})
export class DetailedAuditViewComponent implements OnInit {

  ticketChartUiBasicModel: ChartUiBasicModel;
  skillsChartUiBasicModel: ChartUiBasicModel;
  timelineChartUiBasicModel: ChartUiBasicModel;
  constructor() { }

  ngOnInit(): void {
    this.ticketChartUiBasicModel = ChartUiBasicModel.getBasicPieChart(
      ['Accounts Closed', 'In Progress', 'Accounts Retained'], [4, 10, 2]);
    this.skillsChartUiBasicModel = ChartUiBasicModel.getBasicRadarChart(
      ['Punctuality', 'Communication', 'Data Entry',
        'Team Player', 'Customer Retention', 'Technical Knowledge', 'Meeting Deadlines'],
      [0, 1, 2, 3, 4, 5, 6], 'Employee Skill Analysis');

    this.timelineChartUiBasicModel = ChartUiBasicModel.getBasicMultiLineChart(
      [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C' }
      ], ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    );
  }

}
