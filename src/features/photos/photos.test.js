import userEvent from '@testing-library/user-event';

import { render, screen } from '../../test-utils';
import App from '../../App';

test('adds a dog to the list of dogs after clicking the submit button', async () => {
  render(<App />);

  expect(screen.queryByText(/australian shepherd/i)).not.toBeInTheDocument();

  await userEvent.type(
    screen.getByRole('textbox', { name: /Enter your image's url/i }),
    'https://images.dog.ceo/breeds/australian-shepherd/pepper.jpg'
  );

  await userEvent.type(
    screen.getByRole('textbox', { name: /Enter your image's caption:/i }),
    'Australian Shepherd'
  );

  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(await screen.findByText(/australian shepherd/i)).toBeInTheDocument();
});

test('removes a dog from the list of dogs after clicking the Delete button', async () => {
  render(<App />);

  expect(screen.getByText(/basenji/i)).toBeInTheDocument();

  await userEvent.click(screen.getByTestId(/basenji-button/i));

  expect(screen.queryByText(/basenji/i)).not.toBeInTheDocument();
});

test('toggles favorite button text from "Favorite" to "Favorited"', async () => {
  render(<App />);

  // Find the first dog photo (Bullterrier Staffordshire - id: 1)
  const favoriteButton = screen.getByTestId('1-favorite-button');
  
  // Initially button should show "Favorite" text
  expect(favoriteButton).toHaveTextContent(/favorite/i);
  expect(favoriteButton).not.toHaveTextContent(/favorited/i);
  
  // Click to add to favorites
  await userEvent.click(favoriteButton);
  
  // After click, button should show "Favorited" text
  expect(favoriteButton).toHaveTextContent(/favorited/i);
  expect(favoriteButton).not.toHaveTextContent(/^favorite$/i);
  
  // Click again to remove from favorites
  await userEvent.click(favoriteButton);
  
  // Button should revert to "Favorite" text
  expect(favoriteButton).toHaveTextContent(/favorite/i);
  expect(favoriteButton).not.toHaveTextContent(/favorited/i);
});

test('updates photo caption when valid input is provided', async () => {
  // Mock window.prompt to return a new caption
  global.prompt = jest.fn(() => 'Updated Bullterrier Caption');
  
  render(<App />);

  // Find the first dog photo
  const editButton = screen.getByTestId('1-edit-button');
  
  // Verify original caption is present
  expect(screen.getByText(/bullterrier staffordshire/i)).toBeInTheDocument();
  
  // Click the edit button
  await userEvent.click(editButton);
  
  // Verify prompt was called
  expect(global.prompt).toHaveBeenCalled();
  
  // After editing, the new caption should appear
  expect(screen.getByText(/updated bullterrier caption/i)).toBeInTheDocument();
  
  // The old caption should no longer be visible
  expect(screen.queryByText(/bullterrier staffordshire/i)).not.toBeInTheDocument();
  
  // Clean up
  jest.restoreAllMocks();
});

test('keeps original caption when user cancels edit prompt', async () => {
  // Mock window.prompt to return null (user cancels)
  global.prompt = jest.fn(() => null);
  
  render(<App />);

  // Find the first dog photo
  const editButton = screen.getByTestId('1-edit-button');
  
  // Verify original caption is present
  expect(screen.getByText(/bullterrier staffordshire/i)).toBeInTheDocument();
  
  // Click the edit button
  await userEvent.click(editButton);
  
  // Verify prompt was called
  expect(global.prompt).toHaveBeenCalled();
  
  // Original caption should still be visible (not changed)
  expect(screen.getByText(/bullterrier staffordshire/i)).toBeInTheDocument();
  
  // Clean up
  jest.restoreAllMocks();
});

test('rejects empty or whitespace-only caption input', async () => {
  // Mock window.prompt to return empty string
  global.prompt = jest.fn(() => '   ');
  
  render(<App />);

  // Find the first dog photo
  const editButton = screen.getByTestId('1-edit-button');
  
  // Verify original caption is present
  expect(screen.getByText(/bullterrier staffordshire/i)).toBeInTheDocument();
  
  // Click the edit button
  await userEvent.click(editButton);
  
  // Verify prompt was called
  expect(global.prompt).toHaveBeenCalled();
  
  // Original caption should still be visible (not changed)
  expect(screen.getByText(/bullterrier staffordshire/i)).toBeInTheDocument();
  
  // Clean up
  jest.restoreAllMocks();
});
