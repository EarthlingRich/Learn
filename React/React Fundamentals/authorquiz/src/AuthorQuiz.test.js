import React from 'react';
import { render } from '@testing-library/react';
import AuthorQuiz from './AuthorQuiz';

test('renders text', () => {
  const { getByText } = render(<AuthorQuiz />);
  const textElement = getByText(/Author Quiz/i);
  expect(textElement).toBeInTheDocument();
});
