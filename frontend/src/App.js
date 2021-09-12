import axios from 'axios';

function App() {
  const postReview = () => {
    axios.post(
      'http://localhost:8000/products/613a22befbf542b7462e95f5/reviews',
      {
        text: 'test review',
        username: 'me',
        product: '613a22befbf542b7462e95f5'
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }
    )
  }

  return (
    <button onClick={postReview}>Post review</button>
  )
}

export default App;

