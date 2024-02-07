import Image from "next/image";

export default function MenuItem() {
  return (
    <div className="bg-primaryfade text-center rounded-lg overflow-hidden  hover:shadow-lg">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={"/biryani.jpg"}
          alt=""
          objectFit="cover"
          layout="fill"
          className="relative rounded-t-md hover:scale-105 transition-all duration-300"
        />
      </div>
      <h4 className=" font-semibold my-2">Lorem, ipsum.</h4>
      <p className="text-gray-600">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit,
        quisquam.
      </p>
      <button className="bg-primary w-full text-white  px-4 py-2 mt-2 cursor-pointer  hover:text-black transition-all duration-300">
        Add to cart Rs 100
      </button>
    </div>
  );
}
