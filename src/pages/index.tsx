import { Bullet } from "@/components/Bullet";
import { copyToClipboard } from "@/utils/copyToClipboard";
import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Github from "../components/GitHub";
import LoadingDots from "../components/LoadingDots";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [generatedSQL, setGeneratedSQL] = useState<String>("");

  const queryRef = useRef<null | HTMLDivElement>(null);

  function scrollToQuery(){
    if (queryRef.current !== null) {
      queryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function handleClickOnGeneratedSQL() {
    copyToClipboard(generatedSQL.toString())
    
    toast("Query copied to clipboard", {
      icon: "✂️",
    });
  }

  const prompt = `Generate a SQL query based in this text: ${text}`;


  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedSQL("");
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedSQL((prev) => prev + chunkValue);
    }
    scrollToQuery();
    setLoading(false);
  };

  return (
      <>
      <Head>
        <title>SQL Query Generator | text2sql</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-300 shadow-md transition-colors hover:bg-black mb-5"
          href="https://github.com/pr333do/text2sql"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-neutral-100">
          Generate your SQL query using chatGPT
        </h1>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
           

            <Bullet className="mb-5 sm:mb-0">
              1
            </Bullet>
            <p className="text-left font-medium text-neutral-100">
              Write your query{" "}
              <span className="text-neutral-500">
                (dont overthink adding the right table names)
              </span>
              .
            </p>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full min-h-[6rem] rounded-md border-neutral-700 shadow-sm focus:border-white focus:ring-white my-5 bg-neutral-800 text-neutral-50 "
            placeholder={
              "e.g. Get email from users that have at least 1 purchase."
            }
          />
          {/* <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div> */}

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-6 mt-4 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              Generate your SQL query &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-6 mt-4 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
       
        <hr className="h-px bg-neutral-300 border-1 dark:bg-neutral-300" />

        <div className="space-y-10 my-10">
          {generatedSQL && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-neutral-200 mx-auto"
                  ref={queryRef}
                >
                  Your generated query
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedSQL && (
                  <div
                    className="bg-neutral-800 border-neutral-700 text-neutral-100 rounded-xl shadow-md p-4 hover:bg-neutral-700 transition cursor-copy border"
                    onClick={handleClickOnGeneratedSQL}
                  >
                    <p>{generatedSQL}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </>
  );
};

export default Home;
