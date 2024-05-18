import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {UpperCasePipe} from "@angular/common";
import {Participant} from "../../model/event";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, UpperCasePipe]
})
export class RegisterFormComponent implements OnInit {
  registerForm!: FormGroup;
  eventId!: string;
  eventTitle!: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private eventService: EventService) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      origin: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.eventId = params['id'];
      this.eventTitle = params['title'];
      console.log('Event ID:', this.eventId);
      console.log('Event Name:', this.eventTitle);
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const participant: Participant = this.registerForm.value;
      this.eventService.registerParticipant(this.eventId, participant).subscribe({
        next: response => {
          console.log('Participant registered:', response);
          this.registerForm.reset();
          this.router.navigate(['/events']); // Редирект на сторінку подій
        },
        error: error => {
          if (error.status === 201) {
            console.log('Participant registered:', error.error);
            this.registerForm.reset();
            this.router.navigate(['/events']); // Редирект на сторінку подій
          } else {
            console.error('Error registering participant:', error);
          }
        }
      });
    }
  }
}
