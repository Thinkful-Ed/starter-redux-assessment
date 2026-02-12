import { useSelector, useDispatch } from 'react-redux';
import {
  // Task 7: Import the `removePhoto()` action creator from the photos slice
  selectAllPhotos,
  // Task 13: Import the `selectFilteredPhotos()` selector from the photos slice
  // Task 25: Import the `toggleFavorite()` action creator from the photos slice
  // Task 26: Import the `editPhotoCaption()` action creator from the photos slice
} from '../photos.slice';
import './list.css';

export default function PhotosList() {
  // Task 14: Call `useSelector()` below with `selectFilteredPhotos` instead of `selectAllPhotos`
  const photos = useSelector(selectAllPhotos);
  // Task 8: Store a reference to the Redux store's dispatch method in a variable called `dispatch`

  function handleDeleteButtonClick(id) {
    // Task 9: Dispatch the `removePhoto()` action creator, passing in the id
  }

  // Task 27: Create a `handleToggleFavorite()` function that dispatches the `toggleFavorite()` action with the photo id

  // Task 28: Create a `handleEditCaption()` function that dispatches the `editPhotoCaption()` action with id and newCaption

  const photosListItems = photos.map(({ id, caption, imageUrl }) => (
    <li key={id}>
      <img alt={caption} src={imageUrl} />
      <div>
        <p>{caption}</p>
        {/* Task 29: Add a button to toggle favorite status with data-testid={`${id}-favorite-button`} and call handleToggleFavorite() */}
        <button
          data-testid={`${caption}-button`}
          onClick={() => handleDeleteButtonClick(id)}>
          Delete
        </button>
        {/* Task 30: Add a button to edit caption with data-testid={`${id}-edit-button`} - for now use window.prompt() to get new caption and call handleEditCaption() */}
      </div>
    </li>
  ));

  return photosListItems.length > 0 ? (
    <ul>{photosListItems}</ul>
  ) : (
    <h3>No doggies to display...</h3>
  );
}
