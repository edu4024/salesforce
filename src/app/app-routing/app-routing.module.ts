import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactProfileComponent } from '../contact-profile/contact-profile.component';
import { StartPageComponent } from '../start-page/start-page.component';


const routes: Routes=[
  { path: '', component: StartPageComponent},
  { path: 'start-page', component: StartPageComponent },
  { path: 'contacts', component: ContactListComponent },
  { path: 'profile', component: ContactProfileComponent },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
export const routingComponents =[
              ContactListComponent,
              ContactProfileComponent,
              StartPageComponent
            ];
