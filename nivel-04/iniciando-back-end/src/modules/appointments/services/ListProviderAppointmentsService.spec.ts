import FakeApporintmentsRepository from '../repositories/fakes/FakeApporintmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeApporintmentsRepository: FakeApporintmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeApporintmentsRepository = new FakeApporintmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeApporintmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific  day', async () => {
    const appointment1 = await fakeApporintmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });
    const appointment2 = await fakeApporintmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
