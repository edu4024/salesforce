import { Component } from '@angular/core';
import { ContactService } from './shared/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [ContactService]
})
export class AppComponent {
  title = 'Salesforce Contact List';


  ngOnInit() {

  }

}
