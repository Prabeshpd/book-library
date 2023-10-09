import { Sort } from '@/types/query';

interface SortProps {
  sort?: Sort;
}
const SortIcon = (sortProps: SortProps) => {
  const { sort } = sortProps;

  switch (sort) {
    case 'asc':
      return (
        <svg viewBox="0 0 320 512" fill="currentColor" height="1em" width="1em">
          <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9S19 224.1 32 224.1h256c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
        </svg>
      );

    case 'desc':
      return (
        <svg viewBox="0 0 320 512" fill="currentColor" height="1em" width="1em">
          <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9S19 287.9 32 287.9h256c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 320 512" fill="currentColor" height="1em" width="1em">
          <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9S301 224.1 288 224.1H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9S19.1 288 32.1 288H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
        </svg>
      );
  }
};

export default SortIcon;
