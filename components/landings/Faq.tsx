import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Link } from "lucide-react";

export function Faq() {
  return (
    <div className="w-full border-b border-secondary bg-black/10 py-16">
      <h1 className="pb-8 ml-6 font-pixelfy text-4xl text-[#F5F7F9]">
        Have Questions ?{" "}
      </h1>
      <main className="mx-auto rounded-md p-4 py-6 md:max-w-[900px] xl:max-w-[1500px]">
        <Accordion type="single" collapsible className="w-full text-gray-300">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-[1.2rem] hover:text-[1.3rem] hover:text-btfs xl:text-[1.4rem] xl:hover:text-[1.5rem]">
              What is RentHub-BTFS ?
            </AccordionTrigger>
            <AccordionContent>
              RentHub is a product that is built on top of BTFS to make it easier for developers to use the platform. 
              It provides a set of tools and services that simplify the process of storing and retrieving files on the BTFS network. 
              RentHub is designed to be easy to use and accessible to developers of all skill levels. 
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-[1.2rem] hover:text-[1.3rem] hover:text-btfs xl:text-[1.4rem] xl:hover:text-[1.5rem]">
              How does RentHub-BTFS provides storage ?
            </AccordionTrigger>
            <AccordionContent>
              RentHub-BTFS offers storage by leveraging the pre-existing infrastructure of BTFS, 
              simplifying the complexities associated with the BTFS network,
              and delivering a highly user-friendly experience for developers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-[1.2rem] hover:text-[1.3rem] hover:text-btfs xl:text-[1.4rem] xl:hover:text-[1.5rem]">
              How secure is RentHub ?
            </AccordionTrigger>
            <AccordionContent>
            The biggest perk of using a rented node is that your identity stays hidden. And yeah, RentHub is pretty secure too; they use top-notch standards for managing users. So you can feel safe!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-[1.2rem] hover:text-[1.3rem] hover:text-btfs xl:text-[1.4rem] xl:hover:text-[1.5rem]">
              How do I get started with RentHub-BTFS ?
            </AccordionTrigger>
            <AccordionContent className="flex gap-1"> 
              Visit the <a href="https://docs.renthub.cloud" className="text-btfs flex gap-1">documentation<Link size={10}/></a> to get started with RentHub-BTFS. This will make u enough equiped to start using RentHub-BTFS. 
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}
