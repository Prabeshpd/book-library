import { Formik } from 'formik';
import ClipLoader from 'react-spinners/ClipLoader';

import { LoginRequest } from '@/types/auth';

import loginSchema from './schema';

interface InjectedProps {
  handleFormSubmit: (payload: LoginRequest) => void;
}

export function Login(props: InjectedProps) {
  const { handleFormSubmit } = props;
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={async (values) => {
        const payload = {
          email: values.email.trim(),
          password: values.password,
        };

        await handleFormSubmit(payload);
      }}
    >
      {({ handleBlur, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
        <form className="form" onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="form__body">
              <div className="form__element sm:col-span-4">
                <label className="form__label" htmlFor="email">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    data-test-id="login-form-email"
                    type="email"
                    className="form__input"
                    placeholder="email"
                    name="email"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.email && touched.email && <p className="form__error">{errors.email}</p>}
              </div>
              <div className="form__element sm:col-span-4">
                <label className="form__label" htmlFor="password">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    data-test-id="login-form-password"
                    type="password"
                    className="form__input"
                    placeholder="password"
                    name="password"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.password && touched.password && <p className="form__error">{errors.password}</p>}
              </div>
            </div>

            <div className="form__footer">
              {(!isSubmitting && (
                <button
                  data-test-id="login-form-submit"
                  type="submit"
                  name="submit"
                  disabled={isSubmitting}
                  value="Submit"
                  className="button button--primary"
                >
                  Login
                </button>
              )) || <ClipLoader aria-label="application-loader" />}
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default Login;
