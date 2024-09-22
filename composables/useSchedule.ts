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

  async index() {
    const response = await $fetch(`/api/schedules`);

    // if (status.value !== 'success') {
    //   throw showError({
    //     statusCode: error.value?.data.statusCode,
    //     message: error.value?.data.message,
    //   });
    // }

    const calendar = [];
    if (response) {
      for (const schedule of JSON.parse(response)) {
        calendar.push({
          id: schedule.id,
          user_id: schedule.user,
          title: schedule.title,
          date: new Date(schedule.event_date),
        });
      }
    }

    this._data.value = calendar;
  }

  async show(id: number): Promise<ScheduleType> {
    const response = await $fetch(`/api/schedules/${id}`);

    return JSON.parse(response);
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

    if (isNaN(dateValue.getTime())) {
      throw showError({
        statusCode: 400,
        message: '無効なイベント日付です。',
      });
    }

    const response = await $fetch(`/api/schedules`, {
      method: 'POST',
      body: {
        user: parseInt(user_id),
        title,
        description,
        event_date: dateValue.toISOString(),
        area,
      },
    });
    // if (status.value !== 'success') {
    //   throw showError({
    //     statusCode: error.value?.data.statusCode,
    //     message: error.value?.data.message,
    //   });
    // }

    return response !== null;
  }

  async request(id: number, user_id: number): Promise<boolean> {
    const response = await $fetch(`/api/schedules/${id}`, {
      method: 'PUT',
      body: { user: user_id },
    });
    // if (status.value !== 'success') {
    //   throw showError({
    //     statusCode: error.value?.data.statusCode,
    //     message: error.value?.data.message,
    //   });
    // }

    return response !== null;
  }
}
