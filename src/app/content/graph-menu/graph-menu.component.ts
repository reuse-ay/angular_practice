import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Cell, CellEditorHandler, ConnectionHandler, Graph, InternalEvent, PanningHandler, RubberBandHandler, SelectionCellsHandler, SelectionHandler, TooltipHandler } from '@maxgraph/core';
import { MyCustomGraph } from './my-custom-graph';
import { MyCustomPopupMenuHandler } from './my-custom-popup-menu-handler';

@Component({
  selector: 'app-graph-menu',
  standalone: true,
  imports: [],
  templateUrl: './graph-menu.component.html',
  styleUrl: './graph-menu.component.scss'
})
export class GraphMenuComponent implements AfterViewInit{

  graph!:Graph;
  parent!:Cell;

  @ViewChild('graphContainer') graphContainer!:ElementRef;

  

  ngAfterViewInit(): void {
    InternalEvent.disableContextMenu(this.graphContainer.nativeElement);
    this.graph=new MyCustomGraph(this.graphContainer.nativeElement, undefined, [CellEditorHandler, TooltipHandler, SelectionCellsHandler, MyCustomPopupMenuHandler, ConnectionHandler, SelectionHandler, PanningHandler, RubberBandHandler]);
    this.graph.setTooltips(true);
    this.parent=this.graph.getDefaultParent();

    this.graph.batchUpdate(()=>{
      const parent=this.parent;
      const vertex01 = this.graph.insertVertex({
        parent,
        position: [10, 10],
        size: [100, 100],
        value: 'a',
        style:{
          strokeColor:"none",
          
        }
      });
    });
  }
  
}
