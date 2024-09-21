export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const response = await $fetch(
      'https://qh-server.onrender.com/api/users/registration/',
      {
        method: 'POST',
        body: JSON.stringify({
          email: body.email,
          password: body.password,
          username: body.username,
          displayname: body.displayname,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'ログインに失敗しました．．．',
    });
  }
});
