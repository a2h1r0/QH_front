import type { Schedule as ScheduleType } from '~/types/schedule';

export const useSchedule = () => new Schedule();

class Schedule {
  _data: Ref<ScheduleType[]>;

  constructor() {
    this._data = useState<ScheduleType[]>('schedule', () => []);
  }

  get data() {
    return readonly(this._data);
  }

  async index() {
    const { data, error, status } = await useFetch(`/api/schedules`);
    if (status.value !== 'success') {
      throw showError({
        statusCode: error.value?.data.statusCode,
        message: error.value?.data.message,
      });
    }

    this._data.value = data.value as unknown as ScheduleType[];
  }
}
