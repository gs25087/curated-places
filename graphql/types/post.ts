// @ts-nocheck
import { objectType, extendType, intArg } from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id');
    t.int('userId');
    t.string('title');
    t.float('latitude');
    t.float('longitude');
    t.string('address');
    t.string('description');
    t.string('image');
  }
});

export const Edge = objectType({
  name: 'Edges',
  definition(t) {
    t.int('cursor');
    t.field('post', {
      type: Post
    });
  }
});

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.int('endCursor');
    t.boolean('hasNextPage');
  }
});

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo', { type: PageInfo });
    t.list.field('edges', {
      type: Edge
    });
  }
});

// get ALL Posts
export const LinksQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('posts', {
      type: 'Response',
      args: {
        first: intArg(),
        after: intArg()
      },

      async resolve(_, args, ctx) {
        let queryResults = null;
        if (args.after) {
          queryResults = await ctx.prisma.post.findMany({
            take: args.first,
            skip: 1,
            cursor: {
              id: args.after
            },
            orderBy: {
              id: 'asc'
            }
          });
        } else {
          queryResults = await ctx.prisma.post.findMany({
            take: args.first,
            orderBy: {
              id: 'asc'
            }
          });
        }

        if (queryResults.length > 0) {
          // last element
          const lastLinkInResults = queryResults[queryResults.length - 1];
          // cursor we'll return
          const myCursor = lastLinkInResults.id;

          // queries after the cursor to check if we have nextPage
          const secondQueryResults = await ctx.prisma.post.findMany({
            take: args.first,
            cursor: {
              id: myCursor
            },
            orderBy: {
              id: 'asc'
            }
          });

          const result = {
            pageInfo: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first
            },
            edges: queryResults.map((post) => ({
              cursor: post.id,
              post
            }))
          };

          return result;
        }

        return {
          pageInfo: {
            endCursor: null,
            hasNextPage: false
          },
          edges: []
        };
      }
    });
  }
});
