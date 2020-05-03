import React, {
  useState
} from 'react';

/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

const TitleInput = styled.input`
    width: 100%;
    background-color: #FFF;
    padding: 16px;
    font-size: 24px;
    font-style: italic;
    font-weight: 300;
    border: none;
`;

export default function TodoForm({ createTodo }) {
  const [title, setTitle] = useState('');

  const handleChange = event => {
    setTitle(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();

    createTodo(title);

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TitleInput
        value={title}
        placeholder="What do you need to do?"
        onChange={handleChange}
      />
    </form>
  );
}