import { uuid } from 'uuidv4';

// interface AppointmentContructor {
//   provider: string;
//   date: Date;
// }

class Appointment {
  id: string;

  provider: string;

  date: Date;

  // provider: string, date: Date
  // Omit omitir propriedades
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
