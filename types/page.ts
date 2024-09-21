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
}

export const pages: Pages = {
  index: {
    path: '/',
    head: {
      title: 'QH_front | QH_frontやねん',
      meta: [
        {
          name: 'description',
          content: 'QH_frontやねん',
        },
      ],
    },
  },
  register: {
    path: '/register',
    head: {
      title: '新規登録 | QH_frontやねん',
      meta: [
        {
          name: 'description',
          content: 'QH_frontやねん',
        },
      ],
    },
  },
  login: {
    path: '/login',
    head: {
      title: 'ログイン | QH_frontやねん',
      meta: [
        {
          name: 'description',
          content: 'QH_frontやねん',
        },
      ],
    },
  },
};
