import { useSuspenseQuery } from '@tanstack/react-query';

import { cn } from '@lib/styling.helpers';
import { getPostsQueryOptions } from '@lib/query/query-options/posts/getPostsQueryOptions';

import type { PaginationSearchParams } from '@/router/types';

import { useAppNavigation } from '@hooks/useAppNavigtaion';

import { PostList, PostListEmpty } from '@components/Post';
import { Pagination } from '@components/Pagination';
import { PAGINATION_SEARCH_PARAMS_FALLBACK } from '@/router/constants';

// const posts = [
//   {
//     id: '1',
//     imageUrl: 'https://rickandmortyapi.com/api/character/avatar',
//     description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aliquam dolorem laboriosam voluptas? Fuga distinctio perspiciatis, magnam, reiciendis temporibus ea repellendus voluptates error architecto provident exercitationem. Consequatur tempora incidunt libero!
//     Eum, molestias! Beatae, eos maiores eveniet officiis facilis incidunt tenetur quos, alias pariatur enim sint ex. Aperiam magni aliquid fugiat sint deserunt iste! Modi quis libero reiciendis sapiente. Et, fuga?
//     Fugiat deleniti impedit eum pariatur velit aperiam officiis incidunt, quisquam asperiores magnam explicabo veniam, nisi ipsa animi molestias doloremque vitae. Dolor libero dicta id cum culpa perspiciatis molestias voluptatibus consequuntur.
//     Ducimus mollitia tempore sapiente voluptate impedit error! Ducimus, ex vel? Magni excepturi saepe cupiditate sapiente! Possimus tempora officiis, beatae harum voluptatibus distinctio quos eaque aliquam aut voluptatum sint rem praesentium!
//     Labore velit quos dolorum nam mollitia dignissimos sunt ipsam earum maxime cumque distinctio natus corporis minima doloremque, aut iste suscipit laborum ex laudantium. Doloribus vel delectus repudiandae ratione saepe rerum.
//     Eum blanditiis vero nisi iure nemo similique rerum quos ab provident? Ipsum atque quia corrupti asperiores! Corporis, dignissimos quidem? Non odit at impedit odio perspiciatis aspernatur mollitia quia repudiandae doloremque!
//     Sed voluptas iure nobis alias eligendi aspernatur praesentium perferendis repudiandae dolor! Necessitatibus harum sapiente illo enim autem corrupti sed dolores cumque veniam pariatur modi, quo impedit quam numquam cum? Asperiores!
//     Assumenda ipsa veniam, ducimus cumque nobis doloribus facere aliquid aut alias culpa voluptatum quam amet. Molestias modi eaque dolor enim. Sunt placeat sint amet dolores veritatis culpa quaerat ullam necessitatibus?
//     Ipsa, excepturi. Temporibus quae qui ipsam fugit dignissimos quas totam ex! Quo debitis ducimus, ea odit deserunt perspiciatis dicta! Iure, perspiciatis voluptatem asperiores id impedit eaque rerum delectus vitae minima.
//     Voluptatum nemo error accusantium atque excepturi magni a maiores repellendus magnam deleniti, in blanditiis eaque tempore minima, saepe modi eligendi vitae deserunt quo ut dolorem nulla ullam optio? Nobis, soluta?
//     Dolorum voluptatibus doloribus libero deserunt nam neque rem id suscipit temporibus dolores, accusantium excepturi. Quas eveniet omnis cupiditate in qui, ipsam dicta inventore, similique error harum vel, laboriosam quam delectus.
//     Ullam vitae repellat excepturi hic, amet dolores assumenda veritatis officiis voluptatum accusamus autem necessitatibus debitis nostrum sequi repellendus reiciendis quos fugiat quod odit optio soluta illum ea? Explicabo, accusantium fugit.
//     Corrupti eos vitae molestiae dolor, numquam impedit tenetur ut explicabo obcaecati dolores deleniti, facilis, aut tempora ipsa perferendis autem quas doloremque deserunt corporis et asperiores iusto odio. Rem, aperiam voluptatibus.
//     Blanditiis ex maiores cum nisi numquam ipsum, obcaecati nobis quidem, corporis beatae magni amet quos autem, illo vitae sunt! Facere ut ad aperiam eius dicta blanditiis iusto velit quidem dolorum.
//     Repudiandae quae mollitia deleniti unde ut asperiores doloremque sapiente nemo quam fugit ipsa modi dolorum officia saepe pariatur, praesentium voluptas architecto perspiciatis culpa. Eligendi sint placeat ipsam delectus voluptatem sit?
//     Iste quidem dolore voluptatem, corrupti exercitationem nesciunt a quae error voluptate praesentium tempore quisquam itaque id illum expedita et tenetur obcaecati, mollitia ex! Ipsum, aliquid. Asperiores ea tempora commodi error?
//     Quisquam asperiores debitis, sint repellendus quo voluptatem amet error ipsa sit nulla, non hic accusantium voluptatibus dicta! Perferendis facilis pariatur tempore eum nobis distinctio. Mollitia doloribus officiis cupiditate blanditiis commodi.
//     Adipisci alias nobis consequatur tempora corrupti voluptatibus ratione, quisquam, fugit harum, a tempore temporibus nulla tenetur sint non deserunt eveniet molestiae nihil ducimus. Recusandae fuga nulla exercitationem cum facere hic.
//     Et iusto consequatur explicabo unde odio! Porro officia maxime iste soluta possimus nisi voluptate inventore, itaque distinctio enim maiores autem quis, ratione quasi eligendi mollitia, tempore impedit velit quidem assumenda!
//     Natus, rerum explicabo reprehenderit quibusdam eius at quidem voluptatibus debitis eos exercitationem labore nihil dignissimos quasi esse recusandae non nulla minus alias, accusantium a laudantium officia! Quasi veniam ad earum.`,
//     user: {
//       username: 'user',
//     },
//   },
//   {
//     id: '2',
//     imageUrl: 'https://rickandmortyapi.com/api/character/avatar',
//     description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
//     user: {
//       username: 'user',
//     },
//   },
//   {
//     id: '3',
//     imageUrl: '/testing3.png',
//     description:
//       'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus tempora, sequi laboriosam sit at consequatur quisquam doloremque earum voluptatum! Fugit ad ea dolorum culpa quam aut exercitationem explicabo! Commodi, maxime.',
//     user: {
//       username: 'user',
//     },
//   },
//   {
//     id: '4',
//     imageUrl: '/testing51.png',
//     description:
//       'tLorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus tempora, sequi laboriosam sit at consequatur quisquam doloremque earum voluptatum! Fugit ad ea dolorum culpa quam aut exercitationem explicabo! Commodi, maxime.',
//     user: {
//       username: 'user',
//     },
//   },
//   {
//     id: '5',
//     imageUrl: '/image.png',
//     description:
//       'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus tempora, sequi laboriosam sit at consequatur quisquam doloremque earum voluptatum! Fugit ad ea dolorum culpa quam aut exercitationem explicabo! Commodi, maxime.',
//     user: {
//       username: 'user',
//     },
//   },
// ];

const PAGINATION_ITEMS_LIMIT = PAGINATION_SEARCH_PARAMS_FALLBACK.limit;

type StripePageProps = {
  searchParams: PaginationSearchParams;
};

export function StripePage({ searchParams }: StripePageProps) {
  const {
    data: { data: posts, total, page, lastPage },
  } = useSuspenseQuery(getPostsQueryOptions(searchParams));

  const { isNavigating } = useAppNavigation({
    onNavigated: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  });

  return (
    <div
      className={cn(
        'flex flex-col flex-1 gap-6 p-6',
        isNavigating && 'opacity-50 pointer-events-none',
      )}
    >
      {!posts.length ? (
        <PostListEmpty />
      ) : (
        <>
          <PostList posts={posts} />
          <Pagination
            path='/'
            total={total}
            lastPage={lastPage}
            page={Number(page)}
            limit={PAGINATION_ITEMS_LIMIT}
          />
        </>
      )}
    </div>
  );
}
