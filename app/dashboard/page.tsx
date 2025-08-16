import StatsCard from "@/components/card/StatsCard"
import { Separator } from "@/components/ui/separator"
import { getUser } from "@/actions/authActions"
import { redirect } from "next/navigation"
import WebsitePage from "@/components/dashboard/website/WebsitePage"

const Dashboard =  async () => {
  const user = await getUser()

  if (!user) {
    redirect('/')
  }
  return (
    <main className="lg:p-6 p-2">
      <div>
        <h1 className="text-black font-bold lg:text-4xl text-2xl mb-2">Welcome, {user.username || "dev ben"}</h1>
        <p className="mb-10 lg:text-lg text-md font-medium text-gray-600">✨ Track your page performance and discover powerful tools to boost your online presence!</p>
      </div>
      <span className=" text-black font-extrabold  text-lg">Performance Overview</span>
      <Separator className="my-2" />
      <section>
        <StatsCard/>
      </section>
      <section className="mt-10">
        <WebsitePage/>
      </section>
    </main>
  )
}
export default Dashboard