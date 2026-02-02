import { useRequest } from 'ahooks';

import HeroesService from '@api/rick-and-morty/heroes.service';

const useHero = (heroId: string, delay: number = 0) => {
  return useRequest(() => HeroesService.getOne(heroId), {
    refreshDeps: [heroId],
    debounceWait: delay,
  });
};

export default useHero;
