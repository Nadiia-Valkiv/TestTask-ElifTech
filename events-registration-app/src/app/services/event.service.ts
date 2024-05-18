import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EventResponse} from "../model/eventResponse";
import {Participant} from "../model/event";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api/events';

  constructor(private http: HttpClient) { }

  getEvents(page: number, pageSize: number): Observable<EventResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<EventResponse>(this.apiUrl, { params });
  }

  registerParticipant(eventId: string, participant: Participant): Observable<any> {
    const url = `${this.apiUrl}/${eventId}/participants`;
    return this.http.post(url, participant);
  }
}
