interface Page {
  path: string; // パス
  head: {
    // headタグ設定
    title: string;
    meta: [
      {
        name: string;
        content: string;
      }
    ];
  };
}

export interface Pages {
  index: Page;
  register: Page;
  login: Page;
  home: Page;
  edit: Page;
  schedule: Page;
}

export const pages: Pages = {
  index: {
    path: '/',
    head: {
      title: 'nomoka',
      meta: [
        {
          name: 'description',
          content: 'nomokaやねん',
        },
      ],
    },
  },
  register: {
    path: '/register',
    head: {
      title: '新規登録 | nomoka',
      meta: [
        {
          name: 'description',
          content: 'nomokaの新規登録画面やねん',
        },
      ],
    },
  },
  login: {
    path: '/login',
    head: {
      title: 'ログイン | nomoka',
      meta: [
        {
          name: 'description',
          content: 'nomokaのログイン画面やねん',
        },
      ],
    },
  },
  home: {
    path: '/home',
    head: {
      title: 'nomoka',
      meta: [
        {
          name: 'description',
          content: 'nomokaやねん',
        },
      ],
    },
  },
  edit: {
    path: '/edit',
    head: {
      title: '予定投稿 | nomoka',
      meta: [
        {
          name: 'description',
          content: 'nomokaの予定投稿画面やねん',
        },
      ],
    },
  },
  schedule: {
    path: '/schedule/[id]',
    head: {
      title: 'スケジュール | nomoka',
      meta: [
        {
          name: 'description',
          content: 'nomokaのスケジュール画面やねん',
        },
      ],
    },
  },
};
