import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthOfProviderDTO from '../dtos/IFindAllInMonthOfProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMontOfProvider(
    data: IFindAllInMonthOfProviderDTO,
  ): Promise<Appointment[]>;
}
