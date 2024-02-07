import Image from "next/image";
import RightIcon from "../icons/Right";

export default function Hero() {
  return (
    <section className="flex">
      <div className="py-12 w-1/2">
        <h1 className="text-6xl font-semibold">
          Everything is better with <span className="text-primary text-8xl">Food</span>
        </h1>
        <p className="my-6 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          commodi modi debitis velit aspernatur, odio excepturi aut minus
          adipisci quae.
        </p>
        <div className="flex gap-4 items-center">
            <button className="bg-primary text-white rounded-full px-8 py-2">Order now</button>
            <button className="flex">Learn more <RightIcon/> </button>
        </div>
      </div>
      <div className="relative w-1/2">
        <Image src={"/hero1.png"} alt="" layout="fill" objectFit="contain" />
      </div>
    </section>
  );
}
