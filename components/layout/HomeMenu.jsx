import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
  return (
    <section>
      <div className=" text-center ">
        <SectionHeaders subHeader={'Check out'} mainHeader={'Menu'}/>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
      </div>
    </section>
  );
}
