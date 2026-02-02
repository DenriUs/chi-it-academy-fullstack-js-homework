import apiService from '@api/rick-and-morty/main.service';

import { HeroData, HeroesData } from './types';

abstract class HeroesService {
  static getOne = async (id: string): Promise<HeroData> => {
    return apiService.makeGetRequest(`/character/${id}`);
  };

  static getMany = async (page: number): Promise<HeroesData> => {
    return apiService.makeGetRequest(`/character/?page=${page}`);
  };
}

export default HeroesService;
