import {Component, OnInit} from '@angular/core';
import {MarkdownFilesService} from "../../markdown-files.service";


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})

export class SideNavComponent implements OnInit {

  menuStructure;

  constructor(private markdownFileService: MarkdownFilesService) {
  }

  ngOnInit() {
    this.menuStructure = this.markdownFileService.getMenuStructure()
  }

}
