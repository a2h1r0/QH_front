export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const response = await $fetch('https://qh-server.onrender.com/api/schedules/', {
      method: 'POST',
      body: JSON.stringify({
        user: body.user,
        title: body.title,
        description: body.description,
        event_date: new Date(body.event_date).toISOString(),
        area: body.area,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;

  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'スケジュールの作成に失敗しました．．．',
    });
  }
});
