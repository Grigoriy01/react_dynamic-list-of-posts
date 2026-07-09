import classNames from 'classnames';
import { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import {
  getUsers,
  getPosts,
  getComments,
  createComment,
  deletePostComment,
} from '../public/api/api';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  //#region useEffect
  useEffect(() => {
    let ignore = false;

    const loadUsers = async () => {
      setIsLoading(true);

      try {
        const dataUsers = await getUsers();
        if (!ignore) {
          setUsers(dataUsers);
          setIsError(null);
        }
      } catch {
        if (ignore) return;
        setIsError('Unable to load users');
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const idStringFromUrl = window.location.hash.replace('#user-', '');
      if (!idStringFromUrl) {
        setCurrentUser(null);
        return;
      }

      const userId = Number(idStringFromUrl);
      const findedCurrUser = users.find(user => user.id === userId);
      if (findedCurrUser) {
        setCurrentUser(findedCurrUser);
      } else {
        setCurrentUser(null);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [users]);
  //#endregion useEffect

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  isLoading={isLoading}
                  isError={isError}
                  onSelectedUser={setCurrentUser}
                  currentUser={currentUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                <p data-cy="NoSelectedUser">No user selected</p>

                <Loader />

                <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  Something went wrong!
                </div>

                <div className="notification is-warning" data-cy="NoPostsYet">
                  No posts yet
                </div>

                <PostsList />
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              'Sidebar--open',
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
