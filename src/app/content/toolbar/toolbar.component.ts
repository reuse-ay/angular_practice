import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Graph, Cell, GraphDataModel, MaxToolbar, DragSource, Geometry, CellStyle, gestureUtils } from '@maxgraph/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements AfterViewInit{
  // graph!:Graph;
  // parent!:Cell;

  @ViewChild('graphContainer') graphContainer!:ElementRef;
  @ViewChild('tbContainer') tbContainer!:ElementRef;

  ngAfterViewInit(){
    const toolbar = new MaxToolbar(this.tbContainer.nativeElement);
  toolbar.enabled = false;

  // Creates the model and the graph inside the container
  // using the fastest rendering available on the browser
  const model = new GraphDataModel();
  const graph = new Graph(this.graphContainer.nativeElement, model);
  
  graph.dropEnabled = true;

  DragSource.prototype.getDropTarget = function (graph: Graph, x: number, y: number, _evt: MouseEvent) {
    let cell = graph.getCellAt(x, y);
    if (cell && !graph.isValidDropTarget(cell)) {
      cell = null;
    }
    return cell;
  };

  function addToolbarItem(graph: Graph, toolbar: MaxToolbar, prototype: Cell, image: string) {
    // Function that is executed when the image is dropped on
    // the graph. The cell argument points to the cell under
    // the mousepointer if there is one.
    const funct = (graph: Graph, evt: MouseEvent, cell: Cell | null) => {
      graph.stopEditing(false);
      const pt = graph.getPointForEvent(evt);
      const vertex = graph.getDataModel().cloneCell(prototype);
      if (!vertex) return;
      if (vertex.geometry) {
        vertex.geometry.x = pt.x;
        vertex.geometry.y = pt.y;
      }
      graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
    };
    // Creates the image which is used as the drag icon (preview)
    const img = toolbar.addMode(null, image, funct, '');
    gestureUtils.makeDraggable(img, graph, funct);
  }

  function addVertex(icon: string, w: number, h: number, style: CellStyle) {
    const vertex = new Cell(null, new Geometry(0, 0, w, h), style);
    vertex.setVertex(true);
    addToolbarItem(graph, toolbar, vertex, icon);
  }
  
  addVertex('..', 100, 40, {});
  function addEdge(icon: string, w: number, h: number, style: CellStyle) {
    const vertex = new Cell(null, new Geometry(0, 0, w, h), style);
    vertex.setEdge(true);
    addToolbarItem(graph, toolbar, vertex, icon);
  }
  

  addEdge('./../../assets/163204.png', 120, 160, {
  });
 
  toolbar.addLine();
  }
}
