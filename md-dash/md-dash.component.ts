import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import {
  Chart,
  ChartData,
  ChartOptions,
  TooltipItem,
  registerables
} from 'chart.js';
import { HeaderComponent } from '../../core/components/header/header.component';
import { SidebarComponent } from '../../core/components/sidebar/sidebar.component';

Chart.register(...registerables);

@Component({
  selector: 'app-md-dash',
  standalone: true,
  imports: [CommonModule, NgChartsModule, HeaderComponent, SidebarComponent],
  templateUrl: './md-dash.component.html',
  styleUrl: './md-dash.component.css'
})
export class MdDashComponent implements OnInit {
  pieChartType: 'pie' = 'pie';
  barChartType: 'bar' = 'bar';
  selectedChart: 'chart1' | 'chart2' | 'chart3' | 'bar' | 'orders' | null = null;
  selectedLabel: string | null = null;
  blinkingItems: Set<string> = new Set();

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    animation: { animateRotate: true, animateScale: true },
    plugins: {
      legend: { display: true, position: 'bottom' },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'pie'>) {
            const label = context.label || '';
            const value = context.raw as number;
            const dataArray = context.dataset.data as number[];
            const total = dataArray.reduce((sum, val) => sum + val, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} orders (${percentage}%)`;
          }
        }
      }
    }
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutBounce' },
    scales: {
      x: { beginAtZero: true, title: { display: true, text: 'Month' } },
      y: { beginAtZero: true, title: { display: true, text: 'Delivered Orders' } }
    },
    plugins: {
      legend: { display: true, position: 'bottom' },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const label = context.label || '';
            const value = context.raw as number;
            const dataArray = context.dataset.data as number[];
            const total = dataArray.reduce((sum, val) => sum + val, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} orders (${percentage}%)`;
          }
        }
      }
    }
  };

  ordersBarChartOptions = {
    ...this.barChartOptions,
    scales: {
      ...this.barChartOptions.scales,
      y: { beginAtZero: true, title: { display: true, text: 'Received Orders' } }
    }
  };

  // ✅ Pie chart data
  chart1Data: ChartData<'pie'> = {
    labels: ['Received Items', 'Placed', 'Billing', 'Delivered'],
    datasets: [{
      data: [30, 20, 35, 15],
      backgroundColor: ['#42a5f5', '#ffca28', '#66bb6a', '#ef5350'],
      hoverOffset: 10
    }]
  };

  chart2Data: ChartData<'pie'> = {
    labels: ['Issued', 'Received', 'Inspected', 'Fault', 'Challan'],
    datasets: [{
      data: [30, 15, 20, 15, 20],
      backgroundColor: ['#29b6f6', '#66bb6a', '#ab47bc', '#ef5350', '#667eea'],
      hoverOffset: 10
    }]
  };

  chart3Data: ChartData<'pie'> = {
    labels: ['Supply', 'Services', 'Network'],
    datasets: [{
      data: [35, 35, 30],
      backgroundColor: ['#42a5f5', '#66bb6a', '#ef5350'],
      hoverOffset: 10
    }]
  };

  barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: '2024 Delivered Items',
        data: [90, 110, 150, 80, 70, 130],
        backgroundColor: '#42a5f5',
        borderRadius: 4
      },
      {
        label: '2025 Delivered Items',
        data: [120, 150, 180, 100, 90, 160],
        backgroundColor: '#66bb6a',
        borderRadius: 4
      }
    ]
  };

  ordersBarChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: '2024 Orders',
        data: [80, 100, 90, 110, 105, 95],
        backgroundColor: '#ffca28',
        borderRadius: 5
      },
      {
        label: '2025 Orders',
        data: [100, 120, 130, 140, 135, 125],
        backgroundColor: '#42a5f5',
        borderRadius: 5
      }
    ]
  };

  chart1Items = [
    { name: 'Item A', status: 'Received Items', dueDate: new Date('2025-07-01') },
    { name: 'Item B', status: 'Placed', dueDate: new Date('2025-07-03') },
    { name: 'Item C', status: 'Delivered', dueDate: new Date('2025-07-05') }
  ];

  chart2Items = [
    { name: 'Item X', status: 'Issued', dueDate: new Date('2025-07-02') },
    { name: 'Item Y', status: 'Inspected', dueDate: new Date('2025-07-04') },
    { name: 'Item Z', status: 'Fault', dueDate: new Date('2025-07-06') }
  ];

  barChartItems = [
    { name: 'Delivery Jan', status: 'Delivered', dueDate: new Date('2025-01-30') },
    { name: 'Delivery Feb', status: 'Delivered', dueDate: new Date('2025-02-28') },
    { name: 'Delivery Mar', status: 'Delivered', dueDate: new Date('2025-03-29') }
  ];

  ngOnInit() {
    const allItems = [
      ...this.chart1Items,
      ...this.chart2Items,
      ...this.barChartItems
    ];
    allItems.forEach(item => {
      if (this.isDueSoon(item.dueDate)) {
        setTimeout(() => this.blinkingItems.add(item.name), 5000);
      }
    });
  }

  isDueSoon(date: Date): boolean {
    const today = new Date();
    const due = new Date(date);
    const diff = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 1;
  }

  onChartClick(chart: 'chart1' | 'chart2' | 'chart3' | 'bar' | 'orders', event: any) {
    this.selectedChart = chart;

    const activeElement = event?.event?.chart.getActiveElements?.()[0];
    if (activeElement) {
      const chartData = event.event.chart.data;
      const index = activeElement.index;
      this.selectedLabel = chartData.labels?.[index] || null;
    } else {
      this.selectedLabel = null;
    }
  }

  trackByName(index: number, item: any) {
    return item.name;
  }

  get sortedItems() {
    let items: { name: string; status: string; dueDate: Date }[] = [];

    switch (this.selectedChart) {
      case 'chart1':
        items = this.chart1Items;
        break;
      case 'chart2':
        items = this.chart2Items;
        break;
      case 'chart3':
        return []; // no data attached yet
      default:
        return [];
    }

    // ✅ Filter by clicked segment label
    if (this.selectedLabel) {
      items = items.filter(item =>
        item.status.toLowerCase().includes(this.selectedLabel!.toLowerCase())
      );
    }

    return items.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }
}
