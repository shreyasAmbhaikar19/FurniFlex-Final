import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})

export class UserSettingsComponent implements OnInit {
  activeTab: string = 'profile';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe(urlPath => {
      this.activeTab = urlPath.length ? urlPath[0].path : 'profile';
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.router.navigate([tab], { relativeTo: this.route });
  }
}
