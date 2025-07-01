import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { SidebarComponent } from '../../core/components/sidebar/sidebar.component';

@Component({
  selector: 'app-page-issued-pobill',
  imports: [HeaderComponent,SidebarComponent],
  templateUrl: './page-issued-pobill.component.html',
  styleUrl: './page-issued-pobill.component.css'
})
export class PageIssuedPObillComponent {

}
