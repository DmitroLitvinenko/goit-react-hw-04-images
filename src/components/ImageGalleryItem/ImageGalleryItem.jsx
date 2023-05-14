export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={image.webformatURL}
        alt={image.id}
        onClick={() => onClick(image.largeImageURL)}
      />
    </li>
  );
};
