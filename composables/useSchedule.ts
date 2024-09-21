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
    title: string,
    description: string,
    event_date: string,
    area: string
  ): Promise<boolean> {
    const user_id = sessionStorage.getItem('user_id');

    if (!user_id) {
      throw showError({
        statusCode: 401,
        message: 'ユーザーIDが見つかりません。ログインしてください。',
      });
    }
    const dateValue = new Date(event_date);

    console.log("dateValue : ", dateValue);
    if (isNaN(dateValue.getTime())) {
        throw showError({
            statusCode: 400,
            message: '無効なイベント日付です。',
        });
    }

    const { data, error, status } = await useFetch(`/api/schedules`, {
      method: 'POST',
      body: {
        user: parseInt(user_id),
        title,
        description,
        event_date: dateValue.toISOString(),
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
