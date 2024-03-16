// "use "

// import { useRouter } from "next/router"

export default function UserProfile({ params }: any) {
    // const router = useRouter();
    // const { id } = router.query;
    console.log(params.id)

    return (
        <div className="flex h-screen items-center justify-center  text-xl text-white">profile <span className="bg-orange-600 text-white text-2xl font-bold px-3 rounded-sm space-x-1 m-1">{params.id}</span></div>
    )
}