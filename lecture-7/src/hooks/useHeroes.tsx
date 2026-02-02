import { useRequest } from 'ahooks';

import HeroesService from '@api/rick-and-morty/heroes.service';

const useHeroes = (page: number) => {
  return useRequest(() => HeroesService.getMany(page), {
    refreshDeps: [page],
  });
};

export default useHeroes;
