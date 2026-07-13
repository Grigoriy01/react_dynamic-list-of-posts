import React, { useState } from 'react';
import cn from 'classnames';
import { CommentData } from '../types/Comment';
import { text } from 'stream/consumers';

type Props = {
  postId: number;
  onAddComment: (comment: CommentData) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validError, setValidError] = useState<{
    name?: string;
    email?: string;
    body?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationFields: typeof validError = {};

    if (!formData.name) {
      validationFields.name = 'Name is required';
    }

    if (!formData.email) {
      validationFields.email = 'Email is required';
    }

    if (!formData.body) {
      validationFields.body = 'Enter some text';
    }

    if (Object.keys(validationFields).length > 0) {
      setValidError(validationFields);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onAddComment({
        name: formData.name,
        email: formData.email,
        body: formData.body,
      });

      setFormData(prev => ({ ...prev, body: '' }));
    } catch {
      setSubmitError('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearInputWarning = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setValidError(prev => ({ ...prev, [name]: undefined }));

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={formData.name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': validError.name })}
            onChange={handleClearInputWarning}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {validError.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {validError.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            value={formData.email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': validError.email })}
            onChange={handleClearInputWarning}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {validError.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {validError.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            value={formData.body}
            placeholder="Type comment here"
            className={cn('input', { 'is-danger': validError.body })}
            onChange={handleClearInputWarning}
          />
        </div>

        {validError.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isSubmitting })}
            disabled={isSubmitting}
          >
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
