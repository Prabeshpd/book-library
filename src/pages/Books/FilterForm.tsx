import Select from 'react-select';
import { Formik } from 'formik';

import { Categories } from '@/constants/enums';
import { CATEGORIES_OPTIONS } from '@/constants/constants';

import { BooksFilter } from '@/types/query';

interface FilterFormProps {
  onApplyFilter: (filterParams: BooksFilter) => void;
  onResetFilter: () => void;
}

interface FilterFormValues {
  title: string;
  categories: { value: Categories; label: string } | null;
}

const FilterForm = (props: FilterFormProps) => {
  const { onApplyFilter, onResetFilter } = props;

  const initialValues: FilterFormValues = {
    categories: null,
    title: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onReset={() => {
        onResetFilter();
      }}
      onSubmit={async (values) => {
        const payload = {
          title: values.title.trim(),
          categories: values.categories?.value,
        };

        onApplyFilter(payload);
      }}
    >
      {({ handleChange, handleSubmit, isSubmitting, setFieldValue, values, handleReset }) => (
        <form className="form list-books-form" onSubmit={handleSubmit} onReset={handleReset}>
          <Select
            name="categories"
            id="list-books-form-category"
            aria-label="Search Scope"
            className="react-select"
            classNamePrefix="react-select"
            key={values.categories?.value}
            value={CATEGORIES_OPTIONS.find((option) => option.value === values.categories?.value)}
            options={CATEGORIES_OPTIONS}
            onChange={(selectedOption) => setFieldValue('categories', selectedOption)}
            isClearable={true}
          />
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <input
            onChange={handleChange}
            type="text"
            data-test-id="list-books-form-input"
            id="table-search"
            name="title"
            className="list-books__input"
            placeholder="Search for title"
          />
          <button
            data-test-id="list-books-form-submit"
            className="button button--primary"
            disabled={isSubmitting}
            type="submit"
            name="submit"
          >
            Filter
          </button>
          <button
            data-test-id="list-books-form-reset"
            type="reset"
            name="reset"
            className="button button--secondary list-books-form__button--reset"
          >
            Reset
          </button>
        </form>
      )}
    </Formik>
  );
};

export default FilterForm;
