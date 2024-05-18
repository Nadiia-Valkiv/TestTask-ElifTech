import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view',
  standalone: true,
  templateUrl: './view.component.html',
  imports: [
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  participants = [
    { name: 'Ivan', email: 'test@d.com' },
    { name: 'Yura', email: 'test@d.com' },
    { name: 'Petro', email: 'test@d.com' }
  ];

  searchTerm: string = '';
  filteredParticipants = this.participants;

  filterParticipants() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredParticipants = this.participants.filter(participant =>
      participant.name.toLowerCase().includes(searchTermLower) ||
      participant.email.toLowerCase().includes(searchTermLower)
    );
  }
}
