import { Component } from '@angular/core';
import { SidebarComponent } from '../../core/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-page-poc',
  imports: [HeaderComponent,SidebarComponent],
  templateUrl: './page-poc.component.html',
  styleUrl: './page-poc.component.css'
})
export class PagePOCComponent {

}
