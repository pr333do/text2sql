import { copyToClipboard } from "@/utils/copyToClipboard";
import Link from "next/link";
import {toast} from "react-hot-toast";

export default function Header() {

  function handleClickOnUrl() {
    copyToClipboard("text2sql.pr333do.com")
    toast("Link copied to clipboard", {
      icon: "✂️",
    });
  } 

  return (
    <header className="flex justify-center items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2 border-neutral-800">
      <Link href="/" className="flex  space-x-3">
        <h1 className="text-2xl font-medium ml-2 tracking-tight text-neutral-500" onClick={handleClickOnUrl}>
          text2sql.pr333do.com
        </h1>
      </Link>
    </header>
  );
}
