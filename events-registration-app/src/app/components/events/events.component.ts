import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {EventResponse} from "../../model/eventResponse";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {Event} from "../../model/event";



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: any[] = [];
  totalEvents = 0;
  pageSize = 10;
  currentPage = 1;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents(this.currentPage, this.pageSize)
      .subscribe((response: EventResponse) => {
        this.events = response.events;
        this.totalEvents = response.totalCount;
        this.pageSize = response.pageSize;
        this.currentPage = response.currentPage;
      });
  }

  pageEvent(event: { pageIndex: number; pageSize: number; }): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadEvents();
  }

  navigateToRegister(event: Event) {
    this.router.navigate(['/register', event._id, event.title]);
  }

  navigateToView(event: Event) {
    this.router.navigate(['/view', event._id, event.title]);
  }
}
