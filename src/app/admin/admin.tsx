"use client"

import { useRouter } from "next/navigation"

export default function AdminLock() {

    const router = useRouter()
    return (
        <div className="row width100 background2 centerColumn borderBg3 paddingMedium gapMedium">
        <button className="button buttonPrimary" onClick={() => router.back()}>
          <span className="material-symbols-outlined">arrow_back</span>
          Go back
        </button>
        <h2 className="textSmall headerSmall">
          This is an admin page and requires authentication to use
        </h2>
      </div>
    )
}