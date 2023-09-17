import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const Slider = () => {
  return (
    <Swiper
      className=" border-2 border-yellow-400"
      // spaceBetween={50}
      // slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <div className="max-w-full h-80 mx-auto">
        <SwiperSlide className="">
          <img
            className="object-cover"
            src="https://images.unsplash.com/photo-1593696954577-ab3d39317b97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            // height={400}
            width={400}
          />
        </SwiperSlide>
      </div>
      <SwiperSlide>
        <img
          className="object-cover object-center"
          src="https://images.unsplash.com/photo-1593696954577-ab3d39317b97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
        />
      </SwiperSlide>
      {/* <SwiperSlide>
        <img
          className="object-cover object-center"
          src="https://images.unsplash.com/photo-1561816544-21ecbffa09a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="object-cover object-center"
          src="https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className=" object-bottom"
          src="https://images.unsplash.com/photo-1628076674561-6e9a0b56f2c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
        />
      </SwiperSlide> */}
    </Swiper>
  );
};

export default Slider;
