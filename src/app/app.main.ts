import {AfterViewChecked, Component, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './app.main.html',
  styleUrls: ['./app.main.css']
})


export class AppComponent implements OnInit {
  mobileGap = 728;
  opened: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.toggleSideNavDependingOnWidth(event.target.innerWidth);
  }

  ngOnInit() {
    this.toggleSideNavDependingOnWidth(window.innerWidth);
  }

  private toggleSideNavDependingOnWidth(innerWidth) {
    if (innerWidth <= this.mobileGap) {
      this.opened = false;
    } else if (innerWidth > this.mobileGap) {
      this.opened = true;
    }
  }

}
