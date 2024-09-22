export default defineEventHandler(async (event) => {
  const url = `https://qh-server.onrender.com/api/schedules/${
    event.context.params!.id
  }/`;

  const response = await fetch(url);
  if (!response.ok) {
    throw createError({
      statusCode: 500,
      message: 'データの取得に失敗しました．．．',
    });
  }

  const schedules = await response.text();

  return schedules;
});
