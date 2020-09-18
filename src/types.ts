export type Match = {
  id: string;
  title: 'dota2' | 'csgo' | 'lol';
  tournament: string;
  teamA: string;
  teamB: string;
  score: string | null;
  start: string;
  status: 'pending' | 'ongoing' | 'concluded' | 'error' | 'archived';
};

export type State = {
  matches: { [id: string]: Match };
  exampleText: string;
  token: string;
  isOpen: boolean;
  isLogedIn: boolean;
  isLoaded: boolean;
  matchecDOM: [];
  page: number;
  isLoading: boolean;
  numOfPages: number;
  isModalAddMatch: boolean;
  // TODO: Add properties to this state
};
