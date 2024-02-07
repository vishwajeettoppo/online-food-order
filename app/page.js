import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header/>
      <Hero/>
      <HomeMenu/>
      <section className=' text-center my-10'>
       <SectionHeaders subHeader={'Our Story'} mainHeader={'About Us'}/>
       <div className=' text-gray-600 mt-6 max-w-2xl mx-auto'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita dolorum impedit hic facilis quas perspiciatis! Possimus, totam reprehenderit hic numquam libero consequuntur officia nesciunt maxime, magni, voluptate temporibus. Praesentium, fuga!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae, aperiam deserunt. Quos, facilis corrupti? Eveniet iusto molestiae numquam. Totam labore possimus reprehenderit architecto debitis numquam dolores omnis consequatur cumque velit. Voluptatibus minus doloribus nihil cumque!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio esse aut in fugit, nam deleniti.</p>
       </div>
      </section>

      <section className=' text-center my-10'>
       <SectionHeaders subHeader={'Don\'t hesitate'} mainHeader={'Contact Us'}/>
       <a className='text-2xl mt-6' href="tel:+916204644894">+91 620 464 4894</a>
      </section>

      <footer className='border-t p-4 text-center text-gray-600'>
        &copy;2024 All rights reserved
      </footer>
    </>
  );
}
