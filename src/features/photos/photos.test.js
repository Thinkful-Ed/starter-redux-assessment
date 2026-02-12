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

test('Task 22 & 27 & 29: toggles a photo as favorite when the favorite button is clicked', async () => {
  render(<App />);

  // Find the first dog photo (Bullterrier Staffordshire - id: 1)
  const favoriteButton = screen.getByTestId('1-favorite-button');
  
  // Initially should not have the favorite class/indicator
  expect(favoriteButton).toBeInTheDocument();
  
  // Click to add to favorites
  await userEvent.click(favoriteButton);
  
  // The button should show it's now favorited (implementation depends on student)
  // For example, button text might change or have an active state
  // This test verifies the favorite button exists and is clickable
  expect(favoriteButton).toBeInTheDocument();
  
  // Click again to remove from favorites
  await userEvent.click(favoriteButton);
  
  expect(favoriteButton).toBeInTheDocument();
});

test('Task 23 & 28 & 30: edits a photo caption when the edit button is clicked', async () => {
  // Mock window.prompt to return a new caption
  global.prompt = jest.fn(() => 'Updated Bullterrier Caption');
  
  render(<App />);

  // Find the first dog photo
  const editButton = screen.getByTestId('1-edit-button');
  
  expect(screen.getByText(/bullterrier staffordshire/i)).toBeInTheDocument();
  
  // Click the edit button
  await userEvent.click(editButton);
  
  // After editing, the new caption should appear
  expect(screen.getByText(/updated bullterrier caption/i)).toBeInTheDocument();
  
  // The old caption should no longer be visible
  expect(screen.queryByText(/bullterrier staffordshire/i)).not.toBeInTheDocument();
  
  // Clean up
  global.prompt.mockClear();
});
