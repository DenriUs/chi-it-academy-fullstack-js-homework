import { useRequest } from 'ahooks';

import HeroesService from '@api/rick-and-morty/heroes.service';

const useHero = (heroId: string) => {
  return useRequest(() => HeroesService.getOne(heroId), {
    refreshDeps: [heroId],
  });
};

export default useHero;
