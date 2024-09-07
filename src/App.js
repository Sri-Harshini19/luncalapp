import React, { useState } from 'react';

function App() {
  const [images, setImages] = useState([]); // State to store selected images

  // Handler for file input change
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    // Update the state with new images
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Function to remove an image
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (images.length === 0) {
      alert('Please select at least one image to upload.');
      return;
    }

    images.forEach((image) => {
      const formData = new FormData();
      formData.append('image', image.file);

      // Example POST request to upload the image to a server
      fetch('your-server-url/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Image uploaded successfully:', data);
          alert('Image uploaded successfully!');
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          alert('Error uploading image. Please try again.');
        });
    });
  };

  return (
    <div>
      <h2>Upload Multiple Images</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <button type="submit">Upload All</button>
      </form>

      {/* Horizontal Scroll View for Image Previews */}
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          marginTop: '20px',
          padding: '10px 0',
        }}
      >
        {images.map((image, index) => (
          <div key={index} style={{ position: 'relative', marginRight: '10px' }}>
            <img
              src={image.preview}
              alt={`Preview ${index + 1}`}
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <button
              onClick={() => removeImage(index)}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                padding: '5px',
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
