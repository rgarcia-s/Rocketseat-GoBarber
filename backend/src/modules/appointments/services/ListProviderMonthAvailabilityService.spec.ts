import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('It should be able to list the month availability of a provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2020, 8, 1, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2020, 8, 1, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2020, 8, 1, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2020, 8, 1, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2020, 8, 1, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2020, 8, 1, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2020, 8, 1, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2020, 8, 1, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2020, 8, 1, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2020, 8, 1, 17, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'provider',
      year: 2020,
      month: 9,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 1, available: false },
        { day: 2, available: true },
        { day: 8, available: true },
      ]),
    );
  });
});
