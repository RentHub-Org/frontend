import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

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
              What is BTFS-CLOUD ?
            </AccordionTrigger>
            <AccordionContent>
              BTFS is a decentralized file sharing and storage platform that
              allows users to store and share files on a network of nodes. It is
              similar to Pinata, but with a decentralized architecture.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-[1.2rem] hover:text-[1.3rem] hover:text-btfs xl:text-[1.4rem] xl:hover:text-[1.5rem]">
              How does BTFS work?
            </AccordionTrigger>
            <AccordionContent>
              BTFS works by dividing files into smaller chunks and storing them
              on multiple nodes. It uses a decentralized network of nodes to
              store and retrieve files. The nodes are incentivized to share
              storage space in exchange for a reward in the form of
              cryptocurrency.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-[1.2rem] hover:text-[1.3rem] hover:text-btfs xl:text-[1.4rem] xl:hover:text-[1.5rem]">
              How secure is BTFS?
            </AccordionTrigger>
            <AccordionContent>
              BTFS uses a decentralized architecture to store files, which makes
              it more secure than traditional centralized storage systems. It
              also uses end-to-end encryption to protect files from unauthorized
              access. Additionally, the use of a decentralized network of nodes
              makes it difficult for hackers to access the files stored on the
              platform.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-[1.2rem] hover:text-[1.3rem] hover:text-btfs xl:text-[1.4rem] xl:hover:text-[1.5rem]">
              How do I get started with BTFS?
            </AccordionTrigger>
            <AccordionContent>
              To get started with BTFS, you need to install the BTFS client on
              your device. You can then create an account and start uploading
              files to the platform. Once your files are uploaded, you can share
              them with others by providing them with a link to the file.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}
