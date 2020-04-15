import { Router } from 'express';
// import { uuid } from 'uuidv4';
import { startOfHour, parseISO /* , isEqual */ } from 'date-fns';
// import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

// interface Appointment {
//   id: string;
//   provider: string;
//   date: Date;
// }

// const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    // const parsedDate = startOfHour(parseISO(date));
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
    );
    // const appointmentDate = startOfHour(parsedDate);

    // // const findAppointmentInSameDate = appointments.find(appointment =>
    // //   isEqual(parsedDate, appointment.date),
    // // );
    // const findAppointmentInSameDate = appointmentsRepository.findByDate(
    //   parsedDate,
    // );

    // if (findAppointmentInSameDate) {
    //   return response
    //     .status(400)
    //     .json({ message: 'This appointments is already booked' });
    // }

    // // const appointment = new Appointment(provider, parsedDate);
    // // {
    // //   id: uuid(),
    // //   provider,
    // //   date: parsedDate,
    // // };

    // const appointment = appointmentsRepository.create({
    //   provider,
    //   date: parsedDate,
    // });
    // appointments.push(appointment);
    const appointment = createAppointmentService.execute({
      date: parsedDate,
      provider,
    });
    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
