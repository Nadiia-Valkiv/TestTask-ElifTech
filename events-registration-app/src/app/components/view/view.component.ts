import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../services/event.service";
import {Event, Participant} from "../../model/event";

@Component({
  selector: 'app-view',
  standalone: true,
  templateUrl: './view.component.html',
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  event!: Event;
  eventId!: string;
  searchTerm: string = '';
  filteredParticipants!: Participant[] | undefined

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
      this.loadEvent();
    });
  }

  loadEvent(): void {
    this.eventService.getEvent(this.eventId).subscribe({
      next: (data) => {
        this.event = data;
        this.filteredParticipants = this.event.participants;
      },
      error: (err) => {
        console.error('Error loading event:', err);
      }
    });
  }

  filterParticipants() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredParticipants = this.event.participants?.filter(participant =>
      participant.fullName.toLowerCase().includes(searchTermLower) ||
      participant.email.toLowerCase().includes(searchTermLower)
    ) || [];
  }

  backToEvents() {
    this.router.navigate(['/events']);
  }
}
