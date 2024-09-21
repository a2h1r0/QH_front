export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // console.log(body);

  // const url = `https://deploy.com/login`;

  // const response = await fetch(url, {
  //   method: 'POST',
  // });
  // if (!response.ok) {
  //   throw createError({
  //     statusCode: 500,
  //     message: 'データの取得に失敗しました．．．',
  //   });
  // }

  // const html = await response.text();

  // return html;
  return 1;
});
