import HeroesService from '@api/rick-and-morty/heroes.service';

import useRequest from './useRequest';

const useHero = (heroId, delay = 0) => {
  return useRequest(() => HeroesService.getOne(heroId), [heroId], delay);
};

export default useHero;
