import { render, screen } from '@testing-library/react';
import EventComponent from './EventComponent';

test('renders learn react link', () => {
  render(<EventComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
