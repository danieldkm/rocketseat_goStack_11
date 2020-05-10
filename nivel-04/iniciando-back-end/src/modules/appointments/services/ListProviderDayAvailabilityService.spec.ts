import FakeApporintmentsRepository from '../repositories/fakes/FakeApporintmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeApporintmentsRepository: FakeApporintmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeApporintmentsRepository = new FakeApporintmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeApporintmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeApporintmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });
    await fakeApporintmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user_id',
      year: 2020,
      month: 5,
      day: 20,
    });
    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
