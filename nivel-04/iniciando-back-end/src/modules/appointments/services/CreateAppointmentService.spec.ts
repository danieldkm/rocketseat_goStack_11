import AppError from '@shared/errors/AppError';
import FakeApporintmentsRepository from '../repositories/fakes/FakeApporintmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('shourd be able to create a new appointment', async () => {
    const fakeApporintmentsRepository = new FakeApporintmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeApporintmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123213',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123213');
  });
  it('shourd not be able to create two appointment on the same time', async () => {
    const fakeApporintmentsRepository = new FakeApporintmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeApporintmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123123213',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123123213',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
