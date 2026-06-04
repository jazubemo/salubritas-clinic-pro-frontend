import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex z-20 min-h-[60vh] w-full items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center bg-white text-black px-10 py-8 rounded-xl shadow-2xl border border-gray-100 max-w-md w-full">
        
        <div className="flex flex-row items-center justify-center">
          <h1 className="inline-block pr-6 text-2xl font-semibold border-r border-gray-300 align-top leading-[49px]">
            404
          </h1>
          <div className="inline-block pl-6">
            <h2 className="text-sm font-sans leading-[49px] m-0 p-0 text-gray-700">
              This page could not be found.
            </h2>
          </div>
        </div>

        <Link 
          href="/" 
          className="mt-6 text-xs text-gray-500 hover:text-gray-900 underline underline-offset-4 transition-colors font-sans font-medium"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}


