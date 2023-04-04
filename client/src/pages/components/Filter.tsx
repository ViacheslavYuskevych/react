import { SyntheticEvent } from 'react';

import sharedStyles from '../../styles/shared/form.module.css';
import filterStyles from '../../styles/filter.module.css';

export enum SortEnum {
  NONE = 'none',
  ASC = 'asc',
  DESC = 'desc',
}

function TodoFilter({ search, setSearch, setSort, sort }: IProps) {
  const onSearch = ({ target }: SyntheticEvent) => {
    const { value } = target as HTMLInputElement;

    setSearch(value);
  };

  const onSort = ({ target }: SyntheticEvent) => {
    const { value } = target as HTMLSelectElement;

    setSort(value as SortEnum);
  };

  const formControlClassNames: string = [
    sharedStyles.columnFormControl,
    filterStyles.formControl,
  ].join(' ');

  return (
    <div className={filterStyles.container}>
      <div className={formControlClassNames}>
        <label
          htmlFor='search-input'
          className={sharedStyles.columnFormControlLabel}
        >
          <span className={sharedStyles.columnFormControlLabelSpan}>
            Search
          </span>
        </label>

        <input
          className={sharedStyles.smallFormControl}
          name='search-input'
          type='text'
          onChange={(e) => onSearch(e)}
          value={search}
        />
      </div>

      <div className={formControlClassNames}>
        <label
          htmlFor='sort-select'
          className={sharedStyles.columnFormControlLabel}
        >
          <span className={sharedStyles.columnFormControlLabelSpan}>Sort</span>
        </label>

        <select
          name='sort-select'
          value={sort}
          onChange={onSort}
          className={sharedStyles.smallFormControl}
        >
          {Object.values(SortEnum).map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TodoFilter;

export interface IProps {
  search: string;
  setSearch: (search: string) => void;
  sort: SortEnum;
  setSort: (search: SortEnum) => void;
}
