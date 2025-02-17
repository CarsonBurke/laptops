import { Suspense } from "react";
import Laptops from "./laptops";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Laptops />
        </Suspense>
    )
}