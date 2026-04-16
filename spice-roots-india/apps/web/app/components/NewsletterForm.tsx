'use client';

export default function NewsletterForm() {
  return (
    <form className="flex" onSubmit={e => e.preventDefault()}>
      <input
        type="email"
        placeholder="Your email"
        className="px-3 py-2.5 bg-stone-800 rounded-l-xl w-full text-sm focus:ring-1 focus:ring-orange-600 outline-none text-stone-100 placeholder-stone-500"
      />
      <button
        type="submit"
        className="bg-orange-600 text-white px-4 py-2.5 text-sm rounded-r-xl hover:bg-orange-500 transition font-semibold"
      >
        Go
      </button>
    </form>
  );
}
