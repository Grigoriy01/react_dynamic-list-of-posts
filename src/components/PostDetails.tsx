import React, { useEffect, useState } from 'react';

import {
  getComments,
  createComment,
  deleteComment,
} from '../../public/api/apiFetch';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { CommentData } from '../types/Comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const { id, title, body } = selectedPost;

  const [comments, setComments] = useState<Comment[]>([]);

  const [isWriteComment, setIsWriteComment] = useState(true);

  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isCommentsError, setCommentsIsError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadComments = async () => {
      setIsCommentsLoading(true);

      try {
        const dataComments = await getComments(id);
        if (!ignore) {
          setComments(dataComments);
          setCommentsIsError(null);
        }
      } catch {
        if (ignore) return;
        setCommentsIsError('Something went wrong');
      } finally {
        if (!ignore) {
          setIsCommentsLoading(false);
        }
      }
    };
    loadComments();

    return () => {
      ignore = true;
    };
  }, [selectedPost]);

  const handleAddComment = async (commentData: CommentData) => {
    // weiter soll ich hier schreiben
  };

  const handelDeleteComment = (idComment: number) => {
    setComments(prev => prev.filter(comment => comment.id !== idComment));
    deleteComment(idComment);
  };

  const commentsLength = comments.length === 0;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {isCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {isCommentsError}
            </div>
          )}
          {!isCommentsLoading &&
            !isCommentsError && (
              <>
                {commentsLength && (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}

                {!commentsLength && <p className="title is-4">Comments:</p>}

                {comments.map(comment => (
                  <article className="message is-small" data-cy="Comment">
                    <div className="message-header">
                      <a
                        href="mailto:misha@mate.academy"
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handelDeleteComment(comment.id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                ))}

                {isWriteComment && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setIsWriteComment(false)}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )}
        </div>

        {!isWriteComment && (
          <NewCommentForm
            postId={selectedPost.id}
            onAddComment={handleAddComment}
          />
        )}
      </div>
    </div>
  );
};
