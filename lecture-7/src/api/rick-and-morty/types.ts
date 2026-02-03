export type DataSetInfo = {
  count: number;
};

export type HeroData = {
  id: number;
  name: string;
  status: string;
  image: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
};

export type HeroesData = {
  info: DataSetInfo;
  results: HeroData[];
};
