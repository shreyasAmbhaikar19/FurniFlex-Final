import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoader = false;
  loaderGifUrl = ''; 
  private loaderGifSrcBase = './../assets/loader.gif';
  private minLoaderDisplayTime = 1000;
  private loaderDisplayStartTime!: number;
  private loaderTimeout: any;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      switch(true) {
        case event instanceof NavigationStart:
          this.startLoader();
          break;
        case event instanceof NavigationEnd:
        case event instanceof NavigationError:
        case event instanceof NavigationCancel:
          this.stopLoaderWithMinDisplayTime();
          break;
      }
    });
  }

  private startLoader(): void {
    clearTimeout(this.loaderTimeout);
    this.updateLoaderGifSrc();
    this.showLoader = true;
    this.loaderDisplayStartTime = Date.now();
  }

  private stopLoaderWithMinDisplayTime(): void {
    const elapsedTime = Date.now() - this.loaderDisplayStartTime;
    const remainingTimeToShowLoader = this.minLoaderDisplayTime - elapsedTime;

    if (remainingTimeToShowLoader > 0) {
      this.loaderTimeout = setTimeout(() => {
        this.showLoader = false;
      }, remainingTimeToShowLoader);
    } else {
      this.showLoader = false;
    }
  }

  private updateLoaderGifSrc(): void {
    const uniqueTimestamp = new Date().getTime();
    this.loaderGifUrl = `${this.loaderGifSrcBase}?${uniqueTimestamp}`;
  }
}
