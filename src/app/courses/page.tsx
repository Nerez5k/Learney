import Courses from "@/components/Courses";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
    const {getUser} = getKindeServerSession();
    const user = getUser();

    if(!user || !user.id) redirect('/auth-callback?origin=courses')

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id
        }
    })

    if(!dbUser) redirect('/auth-callback?origin=courses');

    return <Courses />
}

export default Page;