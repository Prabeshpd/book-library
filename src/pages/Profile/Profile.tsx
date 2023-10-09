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
        <div className="detail-user">
          <section className="detail-user__card">
            {(user.imageUrl && <img className="detail-user__image" src={user.imageUrl} alt="image description" />) || (
              <svg fill="none" viewBox="0 0 24 24" height="4em" width="4em" {...props}>
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"
                  clipRule="evenodd"
                />
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0112.065 14a8.984 8.984 0 017.092 3.458A9 9 0 103 12zm9 9a8.963 8.963 0 01-5.672-2.012A6.992 6.992 0 0112.065 16a6.991 6.991 0 015.689 2.92A8.964 8.964 0 0112 21z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <div className="m-5">
              <header className="detail-user__header" data-test-id="detail-user-header">
                Name: {user && user.name?.toUpperCase()}
              </header>
              <p className="detail-user__info" data-test-id="detail-user-status">{`Status: ${status}`}</p>
              <p className="detail-user__info" data-test-id="detail-user-link-counts">
                Email: {user?.email || ''}
              </p>
            </div>
          </section>
          <UserBookList
            isLoadingFetchUserBooks={isLoadingFetchUserBooks}
            meta={meta}
            userBooks={userBooks}
            fetchUserBooks={fetchUserBooks}
            userId={user.id}
          />
        </div>
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
