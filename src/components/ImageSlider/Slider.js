import { useState } from 'react';
import { sliderData } from './data';
import { Carousel } from 'react-bootstrap';

const Slider = () => {
  const [time, setTime] = useState(5000)

  const prevIcon = (
    <button className="slider__arrow__container slider__arrow__container--prev" id="prev" onClick={() => setTime()}>
      <span className="slider__arrow slider__arrow--prev" />
    </button>
  );
  const nextIcon = (
    <button className="slider__arrow__container slider__arrow__container--next" id="next" onClick={() => setTime()}>
      <span className="slider__arrow slider__arrow--next" />
    </button>
  );

  return (
    <Carousel
      className='slider'
      prevIcon={prevIcon}
      prevLabel={null}
      nextIcon={nextIcon}
      nextLabel={null}
      indicators={false}
      interval={time === 5000 ? 5000 : null}
      onSlid={(eventKey) => {
        if (eventKey === 0) setTime()
      }}
    >

      {
        sliderData.map((slider, index) => {
          return (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 home__banner"
                src={slider.image}
                alt="Slide image"
              />
            </Carousel.Item>
          );
        })
      }
      
    </Carousel>
  );
  
};

export default Slider;