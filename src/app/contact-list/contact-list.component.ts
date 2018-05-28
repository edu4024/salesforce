import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})

export class ContactListComponent implements OnInit {
  contacts: Contact[];


  constructor(private contactService: ContactService){
    this.contactService.getContacts()
      .subscribe(res=> this.contacts=res);
  }

  ngOnInit() {
   this.getContacts();
  }

  getContacts(): void {
      this.contactService.getContacts()
        .subscribe(contacts => this.contacts = contacts);
    }

}
