import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import InnerImageZoom from 'react-inner-image-zoom';

import { IScreenshots } from '../../interfaces/interfaces';

import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

interface IGamePageScreenshots {
  screenshots: IScreenshots;
}

const GamePageScreenshots: React.FC<IGamePageScreenshots> = ({ screenshots }) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <GamePageScreenshotsWrapper>
      <Slider {...settings}>
        {screenshots?.results &&
          screenshots.results.map((item: any) => (
            <InnerImageZoom
              min-width={500}
              height={320}
              zoomType={'click'}
              src={item.image}
              zoomSrc={item.image}
              alt="screen game"
            />
          ))}
      </Slider>
    </GamePageScreenshotsWrapper>
  );
};

const GamePageScreenshotsWrapper = styled.div`
  padding-bottom: 40px;

  .iiz {
    display: block;
    margin: 0 15px;
    opacity: 0.8;
    transition: opacity 0.2s ease;
    max-width: 800px;
    &:hover {
      opacity: 1;
    }
  }
  .iiz__btn {
    border-radius: 10px;
  }
  .iiz__btn .iiz__hint {
    display: none;
    &::before {
      display: none;
    }
  }
  img {
    object-fit: cover;
    border: 2px solid #535353;
    border-radius: 15px;
  }
  .slick-dots {
    li {
      button {
        &::before {
          font-size: 12px;
          color: #0581aa;
        }
      }
    }
  }
`;

export default GamePageScreenshots;
