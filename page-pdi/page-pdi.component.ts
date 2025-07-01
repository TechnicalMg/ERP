import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { SidebarComponent } from '../../core/components/sidebar/sidebar.component';

@Component({
  selector: 'app-page-pdi',
  imports: [HeaderComponent,SidebarComponent],
  templateUrl: './page-pdi.component.html',
  styleUrl: './page-pdi.component.css'
})
export class PagePDIComponent {

}
