"use client"

export default function ErrorPage({ err

}) {
    return (
        <main className="error">
            <h1>An Error Occurred !</h1>
            <p>{err}</p>
        </main>
    )
}   