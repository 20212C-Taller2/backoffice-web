import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ubademy', () => {
  render(<App />);
  const linkElement = screen.getByText(/ubademy/i);
  expect(linkElement).toBeInTheDocument();
});
