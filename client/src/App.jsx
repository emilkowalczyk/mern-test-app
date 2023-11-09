import { useEffect, useState } from 'react';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const response = await fetch('http://127.0.0.1:3001');
    const data = await response.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [products]);

  return (
    <div>
      {loading
        ? 'Ładowanie produktów...'
        : products.map((item) => <p key={item._id}>{item.name}</p>)}
    </div>
  );
};

export default App;
