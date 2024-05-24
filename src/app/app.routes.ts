import { Routes } from '@angular/router';
import { HelloComponent } from './content/hello/hello.component';
import { GraphMenuComponent } from './content/graph-menu/graph-menu.component';
import { ToolbarComponent } from './content/toolbar/toolbar.component';

export const routes: Routes = [
	{
		path: "hello",
		component: HelloComponent,
	},
	{
		path:"graph-menu",
		component:GraphMenuComponent,
	},
	{
		path:"graph-toolbar",
		component:ToolbarComponent,
	},



    {
		path: "**",
		component: HelloComponent,
	}
];
