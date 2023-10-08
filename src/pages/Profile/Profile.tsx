import * as React from 'react';
import { connect } from 'react-redux';

import ClipLoader from 'react-spinners/ClipLoader';

import { fetchUser } from '@/actions/users';

import toast from '@/lib/toast';

import AppState from '@/types/states/app';
import User from '@/types/user';

interface StatePropsInterface {
  user: User;
  isLoadingFetchUser: boolean;
}

interface DispatchPropsInterface {
  fetchUser: () => void;
}

type BookDetailProps = StatePropsInterface & DispatchPropsInterface;

const BookDetail = (props: BookDetailProps) => {
  const { fetchUser, isLoadingFetchUser, user } = props;

  React.useEffect(() => {
    async function getCurrentUser() {
      try {
        await fetchUser();
      } catch (err: any) {
        toast(err.message, 'error');
      }
    }

    getCurrentUser();
  }, []);

  return (
    (!isLoadingFetchUser && (
      <>
        <section className="detail-user">
          <header className="detail-user__header" data-test-id="detail-user-header">
            Name: {user && user.name?.toUpperCase()}
          </header>
          <p className="detail-user__info" data-test-id="detail-user-status">{`Status: ${status}`}</p>
          <p className="detail-user__info" data-test-id="detail-user-link-counts">
            Email: {user?.email || ''}
          </p>
        </section>
      </>
    )) || <ClipLoader />
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    user: state.data.users.user,
    isLoadingFetchUser: state.ui.users.isLoadingFetchUser,
  };
};

const mapDispatchToProps = {
  fetchUser,
};

export default connect<StatePropsInterface, DispatchPropsInterface>(mapStateToProps, mapDispatchToProps)(BookDetail);
