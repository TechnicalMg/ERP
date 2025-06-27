import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { SidebarComponent } from '../../core/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-page17',
  imports: [HeaderComponent,SidebarComponent,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './page17.component.html',
  styleUrl: './page17.component.css'
})
export class Page17Component {

}
