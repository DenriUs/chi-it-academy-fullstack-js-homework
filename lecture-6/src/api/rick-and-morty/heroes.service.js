import apiService from '@api/rick-and-morty/main.service';

class HeroesService {
  static getOne = async (id) => {
    return apiService.makeGetRequest(`/character/${id}`);
  };

  static getMany = async (page) => {
    return apiService.makeGetRequest(`/character/?page=${page}`);
  };
}

export default HeroesService;
