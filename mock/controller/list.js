/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-11-26 14:17:25
 * @LastEditTime: 2020-12-08 17:25:04
 */
import { mock } from "mockjs";

export default [
  {
    url: "/service/plat/admin/findArticle",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          articles: {
            total: 4,
            list: [
              {
                id: 6,
                title: "测试文章1",
                author: "电网电力",
                cover_pic: null,
                cate1: 1,
                cate2: 1,
                cate3: 1,
                start_time: "2020-12-08 00:00:00.0",
                end_time: "2020-12-30 00:00:00.0",
                group_id: 2,
                status: 0,
                create_time: "2020-12-08 15:48:38.0",
                profGroup: {
                  id: 2,
                  name: "专业1组",
                  status: 1,
                  itemList: [
                    {
                      id: 2,
                      group_id: 2,
                      prof_id: 1,
                      prof: {
                        id: 1,
                        name: "电缆",
                        status: 1,
                      },
                    },
                    {
                      id: 3,
                      group_id: 2,
                      prof_id: 2,
                      prof: {
                        id: 2,
                        name: "通信",
                        status: 1,
                      },
                    },
                    {
                      id: 18,
                      group_id: 2,
                      prof_id: 3,
                      prof: {
                        id: 3,
                        name: "土建",
                        status: 1,
                      },
                    },
                  ],
                },
                articleContent: [
                  {
                    id: 10,
                    article_id: 6,
                    type: 1,
                    pos: 0,
                    path: "data/article/6/content/tudou.jpg",
                  },
                  {
                    id: 11,
                    article_id: 6,
                    type: 1,
                    pos: 1,
                    path: "data/article/6/content/tudou2.jpg",
                  },
                  {
                    id: 12,
                    article_id: 6,
                    type: 1,
                    pos: 2,
                    path: "data/article/6/content/tudou3.jpg",
                  },
                ],
              },
              {
                id: 5,
                title: "测试文章1",
                author: "电网电力",
                cover_pic: null,
                cate1: 1,
                cate2: 1,
                cate3: 1,
                start_time: "2020-12-08 00:00:00.0",
                end_time: "2020-12-30 00:00:00.0",
                group_id: 2,
                status: 0,
                create_time: "2020-12-08 15:48:34.0",
                profGroup: {
                  id: 2,
                  name: "专业1组",
                  status: 1,
                  itemList: [
                    {
                      id: 2,
                      group_id: 2,
                      prof_id: 1,
                      prof: {
                        id: 1,
                        name: "电缆",
                        status: 1,
                      },
                    },
                    {
                      id: 3,
                      group_id: 2,
                      prof_id: 2,
                      prof: {
                        id: 2,
                        name: "通信",
                        status: 1,
                      },
                    },
                    {
                      id: 18,
                      group_id: 2,
                      prof_id: 3,
                      prof: {
                        id: 3,
                        name: "土建",
                        status: 1,
                      },
                    },
                  ],
                },
                articleContent: [
                  {
                    id: 7,
                    article_id: 5,
                    type: 1,
                    pos: 0,
                    path: "data/article/5/content/tudou.jpg",
                  },
                  {
                    id: 8,
                    article_id: 5,
                    type: 1,
                    pos: 1,
                    path: "data/article/5/content/tudou2.jpg",
                  },
                  {
                    id: 9,
                    article_id: 5,
                    type: 1,
                    pos: 2,
                    path: "data/article/5/content/tudou3.jpg",
                  },
                ],
              },
              {
                id: 4,
                title: "测试文章1",
                author: "电网电力",
                cover_pic: null,
                cate1: 1,
                cate2: 1,
                cate3: 1,
                start_time: "2020-12-08 00:00:00.0",
                end_time: "2020-12-30 00:00:00.0",
                group_id: 2,
                status: 0,
                create_time: "2020-12-08 15:47:55.0",
                profGroup: {
                  id: 2,
                  name: "专业1组",
                  status: 1,
                  itemList: [
                    {
                      id: 2,
                      group_id: 2,
                      prof_id: 1,
                      prof: {
                        id: 1,
                        name: "电缆",
                        status: 1,
                      },
                    },
                    {
                      id: 3,
                      group_id: 2,
                      prof_id: 2,
                      prof: {
                        id: 2,
                        name: "通信",
                        status: 1,
                      },
                    },
                    {
                      id: 18,
                      group_id: 2,
                      prof_id: 3,
                      prof: {
                        id: 3,
                        name: "土建",
                        status: 1,
                      },
                    },
                  ],
                },
                articleContent: [
                  {
                    id: 4,
                    article_id: 4,
                    type: 1,
                    pos: 0,
                    path: "data/article/4/content/tudou.jpg",
                  },
                  {
                    id: 5,
                    article_id: 4,
                    type: 1,
                    pos: 1,
                    path: "data/article/4/content/tudou2.jpg",
                  },
                  {
                    id: 6,
                    article_id: 4,
                    type: 1,
                    pos: 2,
                    path: "data/article/4/content/tudou3.jpg",
                  },
                ],
              },
              {
                id: 3,
                title: "修改文章标题",
                author: "电网电力",
                cover_pic: "data\\article/3/cover.jpg",
                cate1: 1,
                cate2: 2,
                cate3: 2,
                start_time: "2020-12-08 00:00:00.0",
                end_time: "2020-12-30 00:00:00.0",
                group_id: 2,
                status: 0,
                create_time: "2020-12-08 15:45:53.0",
                profGroup: {
                  id: 2,
                  name: "专业1组",
                  status: 1,
                  itemList: [
                    {
                      id: 2,
                      group_id: 2,
                      prof_id: 1,
                      prof: {
                        id: 1,
                        name: "电缆",
                        status: 1,
                      },
                    },
                    {
                      id: 3,
                      group_id: 2,
                      prof_id: 2,
                      prof: {
                        id: 2,
                        name: "通信",
                        status: 1,
                      },
                    },
                    {
                      id: 18,
                      group_id: 2,
                      prof_id: 3,
                      prof: {
                        id: 3,
                        name: "土建",
                        status: 1,
                      },
                    },
                  ],
                },
                articleContent: [
                  {
                    id: 16,
                    article_id: 3,
                    type: 1,
                    pos: 0,
                    path: "data/article/3/content/tudou.jpg",
                  },
                  {
                    id: 17,
                    article_id: 3,
                    type: 1,
                    pos: 1,
                    path: "data/article/3/content/tudou2.jpg",
                  },
                  {
                    id: 18,
                    article_id: 3,
                    type: 1,
                    pos: 2,
                    path: "data/article/3/content/tudou3.jpg",
                  },
                ],
              },
            ],
            pageNum: 1,
            pageSize: 30,
            size: 4,
            startRow: 1,
            endRow: 4,
            pages: 1,
            prePage: 0,
            nextPage: 0,
            isFirstPage: true,
            isLastPage: true,
            hasPreviousPage: false,
            hasNextPage: false,
            navigatePages: 8,
            navigatepageNums: [1],
            navigateFirstPage: 1,
            navigateLastPage: 1,
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/modifyArticle",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          article: {
            id: 3,
            title: "修改文章标题",
            author: "电网电力",
            cover_pic: "data\\article/3/cover.jpg",
            cate1: 1,
            cate2: 2,
            cate3: 2,
            start_time: "2020-12-08 00:00:00.0",
            end_time: "2020-12-30 00:00:00.0",
            group_id: 2,
            status: 0,
            create_time: "2020-12-08 15:45:53.0",
            profGroup: {
              id: 2,
              name: "专业1组",
              status: 1,
              itemList: [
                {
                  id: 2,
                  group_id: 2,
                  prof_id: 1,
                  prof: {
                    id: 1,
                    name: "电缆",
                    status: 1,
                  },
                },
                {
                  id: 3,
                  group_id: 2,
                  prof_id: 2,
                  prof: {
                    id: 2,
                    name: "通信",
                    status: 1,
                  },
                },
                {
                  id: 18,
                  group_id: 2,
                  prof_id: 3,
                  prof: {
                    id: 3,
                    name: "土建",
                    status: 1,
                  },
                },
              ],
            },
            articleContent: [
              {
                id: 16,
                article_id: 3,
                type: 1,
                pos: 0,
                path: "data/article/3/content/tudou.jpg",
              },
              {
                id: 17,
                article_id: 3,
                type: 1,
                pos: 1,
                path: "data/article/3/content/tudou2.jpg",
              },
              {
                id: 18,
                article_id: 3,
                type: 1,
                pos: 2,
                path: "data/article/3/content/tudou3.jpg",
              },
            ],
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/addArticle",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {
          article: {
            id: 4,
            title: "测试文章1",
            author: "电网电力",
            cover_pic: null,
            cate1: 1,
            cate2: 1,
            cate3: 1,
            start_time: "2020-12-08 00:00:00.0",
            end_time: "2020-12-30 00:00:00.0",
            group_id: 1,
            status: 0,
            create_time: "2020-12-08 15:47:55.0",
            profGroup: null,
            articleContent: [
              {
                id: 4,
                article_id: 4,
                type: 1,
                pos: 0,
                path: "data/article/4/content/tudou.jpg",
              },
              {
                id: 5,
                article_id: 4,
                type: 1,
                pos: 1,
                path: "data/article/4/content/tudou2.jpg",
              },
              {
                id: 6,
                article_id: 4,
                type: 1,
                pos: 2,
                path: "data/article/4/content/tudou3.jpg",
              },
            ],
          },
        },
        key: null,
      };
    },
  },
  {
    url: "/service/plat/admin/deleteArticle",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "操作成功",
        data: {},
        key: null,
      };
    },
  },
];
