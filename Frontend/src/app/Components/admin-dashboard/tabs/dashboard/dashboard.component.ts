// In dashboard.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from '../../../../Services/category.service';
import { UserService } from '../../../../Services/user.service';
import { ProductService } from '../../../../Services/products.service';
import { OrderService } from '../../../../Services/order.service';

declare let ApexCharts: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart', { static: true })
  chartElement!: ElementRef;

  @ViewChild('pieChart', { static: true })
  pieChartElement!: ElementRef;

  @ViewChild('barChart', { static: true })
  barChartElement!: ElementRef;

  barChart: any;

  totalUsersCount = 0;
  totalProductsCount = 0;
  totalOrdersCount = 0;
  totalRevenue = 0;

  constructor(private categoryService: CategoryService, private userService: UserService,  private productService: ProductService, private orderService: OrderService) {}

  ngOnInit() {
    this.loadTotalUsersCount();
    this.loadTotalProductsCount();
    this.loadTotalOrdersCount();
    this.loadTotalRevenue();
    this.renderAreaChart();
    this.loadCategoryProductCounts();
    this.fetchWeeklyOrderSummary();
  }

  loadTotalUsersCount() {
    this.userService.getTotalUsersCount().subscribe({
      next: (response:any) => {
        this.totalUsersCount = response.totalUsers; 
      },
      error: (error) => console.error("Failed to load total users count", error)
    });
  }

  loadTotalProductsCount() {
    this.productService.getAllProducts().subscribe({
      next: (products:any) => {
        this.totalProductsCount = products.length; // Set total products count
      },
      error: (error) => console.error("Failed to load total products count", error)
    });
  }

  loadTotalOrdersCount() {
    this.orderService.searchAndPaginateOrders('', 1, 10).subscribe({
      next: (data:any) => {
        this.totalOrdersCount = data.ordersCount; 
      },
      error: (error) => console.error("Failed to load orders count", error)
    });
  }

  loadTotalRevenue() {
    this.orderService.getTotalRevenue().subscribe({
      next: (data) => {
        this.totalRevenue = data.totalRevenue; 
      },
      error: (error) => console.error("Failed to load total revenue", error)
    });
  }

  renderAreaChart() {
    const areaChartOptions = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0
      },
    },
    series: [
      {
        name: "New users",
        data: [6500, 6418, 6456, 6526, 6356, 6456],
        color: "#1A56DB",
      },
    ],
    xaxis: {
      categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  }
  const areaChart = new ApexCharts(this.chartElement.nativeElement, areaChartOptions);
  areaChart.render();
  }


  loadCategoryProductCounts() {
    this.categoryService.getCategoryProductCounts().subscribe((response: any) => {
      const series = response.data.map((cat: any) => cat.productCount);
      const labels = response.data.map((cat: any) => cat.name);
      this.renderPieChart(series, labels);
    });
  }

  renderPieChart(series: number[], labels: string[]) {
    const pieChartOptions = {
      chart: {
        type: 'pie',
        height: '350px'
      },
      series: series, 
      labels: labels,
      colors:["#b30000", "#7c1158", "#4421af", "#1a53ff", "#0d88e6", "#00b7c7", "#5ad45a", "#8be04e", "#ebdc78"],
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    const pieChart = new ApexCharts(this.pieChartElement.nativeElement, pieChartOptions);
    pieChart.render();
  }

  fetchWeeklyOrderSummary() {
    this.orderService.getWeeklyOrderSummary().subscribe({
      next:(response: any) => {
        if(response.success) {
          this.renderBarChart(response.data);
        }
      },
      error: error => {
        console.error('Error fetching weekly order summary:', error);
      }
    });
  }

  renderBarChart(data: any) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    let seriesData = daysOfWeek.map(() => 0);
    data.forEach((item: any) => {
      const dayIndex = item._id - 1; 
      seriesData[dayIndex] = item.totalRevenue;
    });

    const barChartOptions = {
      series: [{
        name: "Revenue",
        data: seriesData,
      }],
      chart: {
        type: "bar",
        height: 240,
        toolbar: {
          show: false,
        },
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        categories: daysOfWeek,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    };

    if(this.barChart) {
      this.barChart.updateOptions(barChartOptions);
    } else {
      this.barChart = new ApexCharts(this.barChartElement.nativeElement, barChartOptions);
      this.barChart.render();
    }
  }
}















