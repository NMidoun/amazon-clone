import Product from '../Product/Product';
import ImageSlider from '../ImageSlider/Slider';
import { useFirestore } from '../../contexts/FirestoreContext';

function Home() {
  const { products } = useFirestore();

  return (
    <div className="home">
        <ImageSlider />

        <div className="home__container">
          {
            products.map(product => (
                <Product key={product.id} product={product} />
            ))
          }
        </div>
    </div>
  );
}

export default Home;
