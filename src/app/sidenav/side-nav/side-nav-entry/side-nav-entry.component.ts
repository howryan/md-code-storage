import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-nav-entry',
  templateUrl: './side-nav-entry.component.html',
  styleUrls: ['./side-nav-entry.component.css']
})
export class SideNavEntryComponent implements OnInit {

  @Input() topic: any;

  constructor() { }

  ngOnInit(): void {
  }

  encodeTitle = (title: string): string => encodeURIComponent(title);
}
