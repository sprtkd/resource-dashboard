import { Component, OnInit } from '@angular/core';
import { ChartUiBasicModel } from 'src/app/models/ui/chart.ui.basic.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-detailed-audit-view',
  templateUrl: './detailed-audit-view.component.html',
  styleUrls: ['./detailed-audit-view.component.css']
})
export class DetailedAuditViewComponent implements OnInit {

  ticketChartUiBasicModel: ChartUiBasicModel;
  skillsChartUiBasicModel: ChartUiBasicModel;
  timelineChartUiBasicModel: ChartUiBasicModel;
  isTimelineBar: boolean;
  constructor() { }

  ngOnInit(): void {
    this.ticketChartUiBasicModel = ChartUiBasicModel.getBasicPieChart(
      ['Accounts Closed', 'In Progress', 'Accounts Retained'], [4, 10, 2]);
    this.skillsChartUiBasicModel = ChartUiBasicModel.getBasicRadarChart(
      ['Punctuality', 'Communication', 'Data Entry',
        'Team Player', 'Customer Retention', 'Technical Knowledge', 'Meeting Deadlines'],
      [0, 1, 2, 3, 4, 5, 6], 'Employee Skill Analysis');
    this.isTimelineBar = false;
    this.timelineChartUiBasicModel = ChartUiBasicModel.getBasicMultiLineChart(
      [
        { data: [6, 5, 3, 4, 6, 2, 5], label: 'Cusstomers Worked On' },
        { data: [8, 10, 5, 9, 6, 4, 9], label: 'Contacts Made' },
        { data: [4, 5, 7, 9, 10, 2, 4], label: 'Inactive Customers' }
      ], ['10 April', '11 April', '12 April', '13 April', '14 April', '15 April', '16 April']
    );
  }

  public toggleTimeline(event: MatSlideToggleChange) {
    this.isTimelineBar = event.checked;
    if (this.isTimelineBar) {
      this.timelineChartUiBasicModel = ChartUiBasicModel.getBasicMultiBarChart(
        [
          { data: [6, 5, 3, 4, 6, 2, 5], label: 'Customers Worked On' },
          { data: [8, 10, 5, 9, 6, 4, 9], label: 'Contacts Made' },
          { data: [4, 5, 7, 9, 10, 2, 4], label: 'Inactive Customers' }
        ], ['10 April', '11 April', '12 April', '13 April', '14 April', '15 April', '16 April']
      );
    } else {
      this.timelineChartUiBasicModel = ChartUiBasicModel.getBasicMultiLineChart(
        [
          { data: [6, 5, 3, 4, 6, 2, 5], label: 'Cusstomers Worked On' },
          { data: [8, 10, 5, 9, 6, 4, 9], label: 'Contacts Made' },
          { data: [4, 5, 7, 9, 10, 2, 4], label: 'Inactive Customers' }
        ], ['10 April', '11 April', '12 April', '13 April', '14 April', '15 April', '16 April']
      );
    }
  }

}
