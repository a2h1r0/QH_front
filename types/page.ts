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
};
