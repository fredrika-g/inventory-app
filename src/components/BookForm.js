"use client";

import { useAuth  } from "@/context/auth";

function BookForm() {
    const auth = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()


        const response = await fetch("/api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                title: "Dune 4",
                author: "Frank Herbert",
                genre: "Sci-fi"
            })
        })

        if(response.ok) {
            const data = await response.json()

            console.log(data)
            return 
        }

        //TODO: error handling

    }

    if(!auth.token){
        return (
            <div>
                You have to be logged in to create a book. :)
            </div>
        )
    }

    return (<div>

        Create new book
        <form onSubmit={handleSubmit}>
            <button>
                Add static book
            </button>
        </form>
        </div>)
}

export default BookForm

