export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const url = `https://qh-server.onrender.com/api/schedules/`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  if (!response.ok) {
    throw createError({
      statusCode: 500,
      message: 'データの取得に失敗しました．．．',
    });
  }

  const schedules = await response.text();

  return schedules;
});
