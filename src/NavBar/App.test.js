import { render, screen } from '@testing-library/react';
import SearchComponent from './EventComponent';

test('renders learn react link', () => {
  render(<SearchComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
