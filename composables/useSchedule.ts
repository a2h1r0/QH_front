import type { Schedule as ScheduleType } from '~/types/schedule';

export const useSchedule = () => new Schedule();

class Schedule {
  _data: Ref<any[]>;

  constructor() {
    this._data = useState<any[]>('schedule', () => []);
  }

  get data() {
    return readonly(this._data);
  }

  async index(auth_id: number) {
    const { data, error, status } = await useFetch(`/api/schedules`);
    
    if (status.value !== 'success') {
      throw showError({
        statusCode: error.value?.data.statusCode,
        message: error.value?.data.message,
      });
    }
  
    const calendar = [];
    if (data.value) {
      for (const schedule of JSON.parse(data.value)) {
        if (schedule.user === auth_id) {
          calendar.push({
            title: schedule.title,
            start: new Date(schedule.event_date),
            end: new Date(schedule.event_date),
            allDay: true,
          });
        }
      }
    }
    console.log("calendar : ", calendar);
    this._data.value = calendar;
  }

  async create(
    user_id: number,
    title: string,
    description: string,
    event_date: Date,
    area: string
  ): Promise<boolean> {
    const { data, error, status } = await useFetch(`/api/schedules`, {
      method: 'POST',
      body: {
        user: user_id,
        title,
        description,
        event_date: event_date.toISOString(),
        area,
      },
    });
    if (status.value !== 'success') {
      throw showError({
        statusCode: error.value?.data.statusCode,
        message: error.value?.data.message,
      });
    }

    return data.value !== null;
  }
}
