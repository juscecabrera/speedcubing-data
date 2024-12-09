import { auth, signIn, signOut } from "@/auth"

const NavBar = async () => {
    const session = await auth() 

  return (
      <div className="top-0 left-0 absolute p-10">
        {session && session?.user ? (
            <>
                <p>{session?.user?.name}</p>
                <p>{session?.user?.email}</p>

                <form action={async () => {
                    "use server";
                    await signOut({redirectTo: "/"})}}
                >
                    <button type="submit" className="border-black rounded-xl border-2 px-5 py-2">
                        Logout
                    </button>
                </form>
            </>
        )
    : <>
        <form action={async () => {
            "use server";
            await signIn('google')}}
        >
            <button type="submit">
                Login
            </button>
        </form>
    </>}
    </div>
  )
}

export default NavBar