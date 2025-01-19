import { trpc } from "@/lib/trpc"

export default function Laptop() {

    let {data, isLoading} = trpc.getLaptopByName.useQuery({name: "Laptop Name"})

    return (
        <main className="main">
            Hi    
        </main>
    )
}