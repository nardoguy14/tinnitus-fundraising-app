import { render, screen } from '@testing-library/react';
import ProfileComponent from './EventComponent';

test('renders learn react link', () => {
  render(<ProfileComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
