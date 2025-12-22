'use client'

export default function Error({ error, reset }) {
  return (
    <main className="flex gap-2 flex-col items-center justify-center w-full">
      <h2 className="text-3xl font-semibold animate-pulse">Something went wrong!</h2>
      <button onClick={() => reset()} className="btn btn-primary trns">Try again</button>
    </main>
  )
}