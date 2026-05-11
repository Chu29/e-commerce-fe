import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-white via-indigo-50/40 to-purple-100/60 px-4 py-20 z-0 ">
      {/* Background decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
          Manage Your <br />
          E-commerce API&nbsp;with <span className="text-[#3b3bf5]">Ease.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-gray-500 leading-relaxed">
          A powerful, developer-friendly interface for creating, reading,
          updating, and deleting product data. Streamline your inventory
          management with our robust React-based toolkit designed for modern
          workflows.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-[#3b3bf5] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-[#2e2ec4] hover:shadow-indigo-500/40 active:scale-[0.97]"
          >
            Explore Products
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <a
            href="https://e-commerce-api-mv92.onrender.com/api-docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-medium text-gray-700 underline underline-offset-4 decoration-gray-300 hover:text-gray-900 hover:decoration-gray-500 transition"
          >
            View Documentation
          </a>
        </div>
      </div>

      {/* Dashboard mockup preview */}
      <div className="relative z-10 mt-20 w-full max-w-3xl">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-300/40 overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>

          {/* Skeleton content */}
          <div className="p-6 space-y-6">
            {/* Top bar skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-8 w-40 rounded-md bg-indigo-100" />
              <div className="h-8 w-24 rounded-md bg-indigo-200" />
            </div>

            {/* Product cards skeleton */}
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 rounded-xl bg-indigo-50 border border-indigo-100"
                />
              ))}
            </div>

            {/* Text lines skeleton */}
            <div className="space-y-3">
              <div className="h-3 w-full rounded bg-gray-100" />
              <div className="h-3 w-5/6 rounded bg-gray-100" />
              <div className="h-3 w-4/6 rounded bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
