This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/**/*, README.md
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
src/
  components/
    Loader/
      index.tsx
      Loader.scss
      Loader.tsx
    NewCommentForm.tsx
    PostDetails.tsx
    PostsList.tsx
    UserSelector.tsx
  types/
    Comment.ts
    Post.ts
    User.ts
  utils/
    fetchClient.ts
  App.scss
  App.tsx
  index.tsx
  vite-env.d.ts
README.md
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="src/components/Loader/index.tsx">
export * from './Loader';
</file>

<file path="src/components/Loader/Loader.scss">
.Loader {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  &__content {
    border-radius: 50%;
    width: 2em;
    height: 2em;
    margin: 1em auto;
    border: 0.3em solid #ddd;
    border-left-color: #000;
    animation: load8 1.2s infinite linear;
  }
}

@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</file>

<file path="src/components/NewCommentForm.tsx">
import React from 'react';

export const NewCommentForm: React.FC = () => {
  return (
    <form data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className="input is-danger"
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Name is required
        </p>
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className="input is-danger"
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Email is required
        </p>
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className="textarea is-danger"
          />
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Enter some text
        </p>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link is-loading">
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
</file>

<file path="src/types/Comment.ts">
export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
</file>

<file path="src/types/Post.ts">
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
</file>

<file path="src/types/User.ts">
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
</file>

<file path="src/vite-env.d.ts">
/// <reference types="vite/client" />
</file>

<file path="src/components/Loader/Loader.tsx">
import './Loader.scss';

export const Loader = () => (
  <div className="Loader" data-cy="Loader">
    <div className="Loader__content" />
  </div>
);
</file>

<file path="src/components/PostDetails.tsx">
import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails: React.FC = () => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #18: voluptate et itaque vero tempora molestiae
          </h2>

          <p data-cy="PostBody">
            eveniet quo quis laborum totam consequatur non dolor ut et est
            repudiandae est voluptatem vel debitis et magnam
          </p>
        </div>

        <div className="block">
          <Loader />

          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>

          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>

          <p className="title is-4">Comments:</p>

          <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                Misha Hrynko
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              Some comment
            </div>
          </article>

          <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                Misha Hrynko
              </a>

              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>
            <div className="message-body" data-cy="CommentBody">
              One more comment
            </div>
          </article>

          <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                Misha Hrynko
              </a>

              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {'Multi\nline\ncomment'}
            </div>
          </article>

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
          >
            Write a comment
          </button>
        </div>

        <NewCommentForm />
      </div>
    </div>
  );
};
</file>

<file path="src/components/PostsList.tsx">
import React from 'react';

export const PostsList: React.FC = () => (
  <div data-cy="PostsList">
    <p className="title">Posts:</p>

    <table className="table is-fullwidth is-striped is-hoverable is-narrow">
      <thead>
        <tr className="has-background-link-light">
          <th>#</th>
          <th>Title</th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th> </th>
        </tr>
      </thead>

      <tbody>
        <tr data-cy="Post">
          <td data-cy="PostId">17</td>

          <td data-cy="PostTitle">
            fugit voluptas sed molestias voluptatem provident
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
            >
              Open
            </button>
          </td>
        </tr>

        <tr data-cy="Post">
          <td data-cy="PostId">18</td>

          <td data-cy="PostTitle">
            voluptate et itaque vero tempora molestiae
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link"
            >
              Close
            </button>
          </td>
        </tr>

        <tr data-cy="Post">
          <td data-cy="PostId">19</td>
          <td data-cy="PostTitle">adipisci placeat illum aut reiciendis qui</td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
            >
              Open
            </button>
          </td>
        </tr>

        <tr data-cy="Post">
          <td data-cy="PostId">20</td>
          <td data-cy="PostTitle">doloribus ad provident suscipit at</td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
            >
              Open
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
</file>

<file path="src/components/UserSelector.tsx">
import React from 'react';

export const UserSelector: React.FC = () => {
  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <a href="#user-1" className="dropdown-item">
            Leanne Graham
          </a>
          <a href="#user-2" className="dropdown-item is-active">
            Ervin Howell
          </a>
          <a href="#user-3" className="dropdown-item">
            Clementine Bauch
          </a>
          <a href="#user-4" className="dropdown-item">
            Patricia Lebsack
          </a>
          <a href="#user-5" className="dropdown-item">
            Chelsey Dietrich
          </a>
        </div>
      </div>
    </div>
  );
};
</file>

<file path="src/utils/fetchClient.ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://mate.academy/students-api';

// a promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null, // we can send any data to the server
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    // We add body and Content-Type only for the requests with data
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // for a demo purpose we emulate a delay to see if Loaders work
  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => response.json());
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
</file>

<file path="src/App.scss">
.Sidebar {
  overflow: hidden;
  opacity: 0;
  transition-property: max-width, opacity;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;

  @media (min-width: 769px) {
    max-width: 0;
  }

  &--open {
    opacity: 1;

    @media (min-width: 769px) {
      max-width: 50%;
    }
  }
}

.message-body {
  white-space: pre-line;
}
</file>

<file path="src/index.tsx">
import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
</file>

<file path="src/App.tsx">
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App = () => (
  <main className="section">
    <div className="container">
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <div className="tile is-child box is-success">
            <div className="block">
              <UserSelector />
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
</file>

<file path="README.md">
# React Dynamic List of Posts

Implement the App with ability to show posts of a selected user. Each post can
be opened in the sidebar with its comments. There should delete a comment and a
form to add new comments.
Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.

> Here is [the working version](https://mate-academy.github.io/react_dynamic-list-of-posts/)

1. Learn the `utils/fetchClient.ts` and use it to interact with the API (tests expect that you each API request is sent after 300 ms delay);
1. Initially the `App` shows the `UserSelector` and a paragraph `No user selected` in the main content block.
    - load users from the API on page load;
    - implement the `UserSelector` as a dropdown using the given markup;
1. When a user is selected load the user's posts form [the API](https://mate-academy.github.io/fe-students-api/) and show them using a table in the main content clock;
    - show the `<Loader>` while waiting for the API response;
    - show an error notification if `posts` loading fails;
    - if the user has no posts show the `No posts yet` notification.
1. Add the `Sidebar--open` class to the sidebar when a post is selected;
    - the post details should appear there immediately;
    - the post commnets should be loaded from the API;
    - the `Loader` is shown before comments are loaded;
    - `CommentsError` notification is show on loading error;
    - `NoComments` message is shown if the post does not have comments yet;
1. Show the `Write a comment` button below the comments
    - after click hide the button and show the form to add new comment;
    - the form stays visible until the other post is opened;
    - the form should be implemented as a separate component;
1. The form requires an author's name and email and a comment text.
    - show errors only after the form is submitted;
    - remove an error on the field change;
    - keep the `name` and `email` after the successful submit but clear a comment text;
    - The `Clear` button should also clear all errors;
    - Add the `is-loading` class to the submit button while waiting for a response;
    - Add the new comment received as a response from the `API` to the end of the list;
1. Implement comment deletion
    - Delete the commnet immediately not waiting for the server response to improve the UX.
1. (*) Handle `Add` and `Delete` errors so the user can retry
</file>

</files>
