export interface Event {
  _id: string,
  title: string,
  description: string,
  eventDate: string,
  organizer: string,
  participants?: Participant[]
}

export interface Participant {
  dateOfBirth: string,
  email: string,
  fullName: string,
  origin: string
}
