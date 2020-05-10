import AppError from '@shared/errors/AppError';
import FakeApporintmentsRepository from '../repositories/fakes/FakeApporintmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeApporintmentsRepository: FakeApporintmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeApporintmentsRepository = new FakeApporintmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeApporintmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123213',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123213');
  });
  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123123213',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123123213',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
