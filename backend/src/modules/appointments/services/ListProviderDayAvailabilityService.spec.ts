import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('It should be able to list the day availability of a provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 1, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 6, 1, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'provider',
      day: 1,
      year: 2020,
      month: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
      ]),
    );
  });
});
