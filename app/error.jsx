'use client'

export default function Error({ error, reset }) {
  return (
    <main className="flex gap-2 flex-col items-center justify-center w-full my-10">
      <h2 className="text-3xl font-semibold animate-pulse">Something went wrong!</h2>
      <button onClick={() => reset()} className="btn btn-primary trns rounded-md">Try again</button>
    </main>
  )
}