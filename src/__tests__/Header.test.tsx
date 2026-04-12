import { render, screen } from '@testing-library/react';
import Header from '../Header';

test('Header component renders the year', () => {
  render(<Header />);

  const yearElement = screen.getByText('2026');
  expect(yearElement).toBeInTheDocument();
});
