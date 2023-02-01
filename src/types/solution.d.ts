declare interface SolutionMap {
  [key: string]: number[];
}

declare interface Solution {
  equation: string;
  result: number;
  map: SolutionMap;
}
