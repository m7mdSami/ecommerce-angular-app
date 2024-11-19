import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'e-commerce-app-dashboard-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {

}
