import { SwiperOptions } from 'swiper/types'
const swiperConfig: SwiperOptions = {
  freeMode: true,
  touchAngle: 65,
  slidesPerView: 3,
  preloadImages: false,
  updateOnImagesReady: false,
  updateOnWindowResize: false,
  //   MaterialUI Breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1.3,
    },
    600: {
      slidesPerView: 2,
    },
    960: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
    1920: {
      slidesPerView: 5,
    },
  },
}

export default swiperConfig
