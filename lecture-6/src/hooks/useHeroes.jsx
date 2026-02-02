import HeroesService from '@api/rick-and-morty/heroes.service';

import useRequest from './useRequest';

const useHeroes = (page, delay = 0) => {
  return useRequest(() => HeroesService.getMany(page), [page], delay);
};

export default useHeroes;
