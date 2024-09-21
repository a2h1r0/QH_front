export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    // APIに対してログインリクエストを送信
    const response = await $fetch('https://qh-server.onrender.com/api/users/login/', {
      method: 'POST',
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;

  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'ログインに失敗しました．．．',
    });
  }
});