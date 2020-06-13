import {Component, OnInit} from '@angular/core';
import {MarkdownFilesService} from "../../markdown-files.service";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

export class TreeNode {
  title: string;
  invisible: boolean;
  children?: TreeNode[];
  pathKey?: string;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})

export class SideNavComponent implements OnInit {

  dataSource: MatTreeNestedDataSource<TreeNode>;
  treeControl: NestedTreeControl<TreeNode>;

  constructor(private markdownFileService: MarkdownFilesService) {
    this.treeControl = new NestedTreeControl<TreeNode>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<TreeNode>();
  }

  ngOnInit() {
    this.dataSource.data = this.markdownFileService.getMenuStructure();
    this.configureExpandAndCollapse(this.dataSource.data);
  }

  //Check if a current node has children or is a leaf
  hasNestedChild = (_: number, nodeData: TreeNode) => nodeData.children && nodeData.children.length > 0;


  private configureExpandAndCollapse(dataNodesArray: TreeNode[]) {
    //Set data nodes to enable collapse and expand via treeControl
    this.treeControl.dataNodes = dataNodesArray;
    this.treeControl.collapseAll();

    let pathname = location.pathname;

    if (pathname && pathname.lastIndexOf("/") > 0) {
      let pathKey = pathname.substring(pathname.indexOf("/", 1) + 1, pathname.length)
      this.expandSpecificNode(pathKey, this.treeControl.dataNodes);
    }
  }

  //Expand the current node which matches with pathKey parameter from the url
  private expandSpecificNode(pathKey: string, dataNodes: TreeNode[]) {
    for (const node of dataNodes) {

      if (node.children) {
        let nodeFound = this.expandSpecificNode(pathKey, node.children);
        if (nodeFound) {
          //If the pathKey from url and the pathKey from a node matched, also expand parent nodes
          this.treeControl.expand(node);
          return true;
        }
      }

      if (node.pathKey == pathKey) {
        this.treeControl.expand(node);
        return true;
      }
    }
    return false;
  }

}
