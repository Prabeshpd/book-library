import * as React from 'react';
import { connect } from 'react-redux';

import ClipLoader from 'react-spinners/ClipLoader';

import { fetchUser } from '@/actions/users';
import { fetchUserBooks } from '@/actions/userBooks';

import toast from '@/lib/toast';

import AppState from '@/types/states/app';
import { PaginationMeta, PageQueryParams } from '@/types/query';
import User from '@/types/user';
import { UserBook } from '@/types/userBooks';

import UserBookList from './UserBookLists';

interface StatePropsInterface {
  user: User;
  isLoadingFetchUser: boolean;
  meta: PaginationMeta;
  userBooks: UserBook[];
  isLoadingFetchUserBooks: boolean;
}

interface DispatchPropsInterface {
  fetchUser: (id: string) => void;
  fetchUserBooks: (userId: string, pageQueryParams: PageQueryParams) => void;
}

type BookDetailProps = StatePropsInterface & DispatchPropsInterface;

const BookDetail = (props: BookDetailProps) => {
  const { fetchUser, isLoadingFetchUser, user, isLoadingFetchUserBooks, meta, userBooks, fetchUserBooks } = props;

  React.useEffect(() => {
    async function getCurrentUser() {
      try {
        await fetchUser(user.id);
      } catch (err: any) {
        toast('Can not fetch profile information.', 'error');
      }
    }

    getCurrentUser();
  }, [user.id]);

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
        <UserBookList
          isLoadingFetchUserBooks={isLoadingFetchUserBooks}
          meta={meta}
          userBooks={userBooks}
          fetchUserBooks={fetchUserBooks}
          userId={user.id}
        />
      </>
    )) || <ClipLoader />
  );
};

const mapStateToProps = (state: AppState) => {
  console.log({ state });
  return {
    user: state.data.users.user,
    isLoadingFetchUser: state.ui.users.isLoadingFetchUser,
    userBooks: state.data.userBooks.userBooks,
    meta: state.data.userBooks.meta,
    isLoadingFetchUserBooks: state.ui.userBooks.isLoadingFetchUserBooks,
  };
};

const mapDispatchToProps = {
  fetchUser,
  fetchUserBooks,
};

export default connect<StatePropsInterface, DispatchPropsInterface>(mapStateToProps, mapDispatchToProps)(BookDetail);
