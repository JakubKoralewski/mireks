import paths from './paths';

export enum TARGET_PATH {
  US = 'toUS',
  KRUS = 'toKRUS',
  ZUS = 'toZUS',
  MIREKS = 'toMireks',
}

export type IItem = { name: string; target: TARGET_PATH; fontSize: number };
export type IItems = IItem[];

export let items: IItems = [
  {
    name: 'VAT',
    target: TARGET_PATH.US,
    fontSize: 6,
  },
  {
    name: 'DRA',
    target: TARGET_PATH.ZUS,
    fontSize: 6,
  },
  {
    name: 'VAT-R',
    target: TARGET_PATH.US,
    fontSize: 5.5,
  },
  {
    name: 'PIT',
    target: TARGET_PATH.US,
    fontSize: 6,
  },
  {
    name: 'CIT',
    target: TARGET_PATH.US,
    fontSize: 6,
  },
];
