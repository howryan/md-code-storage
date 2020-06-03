import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import {MarkdownFilesService} from "../../markdown-files.service";

@Component({
  selector: 'app-detail-content',
  templateUrl: './detail-content.component.html',
  styleUrls: ['./detail-content.component.css']
})

export class DetailContentComponent implements OnInit {

  paths: any;

  constructor(private route: ActivatedRoute, private markdownFileService: MarkdownFilesService) { }

  ngOnInit() {
    //let mainTopic = this.activatedRoute.snapshot.params['mainTopic'];
    //let pathKey = this.route.snapshot.params['pathKey'];

    this.route.params.subscribe(routeParams => {
      this.paths = this.markdownFileService.getPathKeys(routeParams.pathKey);
    })

  }
}
