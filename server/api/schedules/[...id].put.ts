export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const response = await $fetch(
    `https://qh-server.onrender.com/api/schedules/${event.context.params!.id}/`,
    {
      method: 'PUT',
      body: JSON.stringify({
        apply_user: body.apply_user,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response;
});
