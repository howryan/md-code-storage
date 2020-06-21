import { Injectable } from '@angular/core';
import MarkdownsJson from '../assets/menu-structure-files.json';


@Injectable({
  providedIn: 'root'
})
export class MarkdownFilesService {

  markdownFiles;
  menuStructure;
  pathKeys;

  constructor() {
    this.markdownFiles = MarkdownsJson;
    this.menuStructure = this.markdownFiles.menu_structure;
    this.pathKeys = this.markdownFiles.pathKeys;
  }

  getMenuStructure(): any {
    return this.menuStructure;
  }

  getPathKeys(pathKey: string): any {
    return this.pathKeys[pathKey];
  }
}
