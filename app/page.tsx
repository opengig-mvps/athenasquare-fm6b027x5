'use client' ;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Users, BarChart, DollarSign, LayoutGrid, HardDrive, Slack, Mail, Calendar } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-pink-100">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-pink-200">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  Simplify Your Hiring Process
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Effortlessly track and manage job applications with our powerful hiring management tool.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button className="bg-pink-500 text-pink-100">Get Started</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
              <img
                src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-300">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Seamless Integrations</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Connect with your favorite tools and services to streamline your hiring process.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <HardDrive className="h-12 w-12" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Google Drive</h3>
                  <p className="text-muted-foreground">
                    Integrate with Google Drive to manage your documents effortlessly.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <Mail className="h-12 w-12" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Gmail</h3>
                  <p className="text-muted-foreground">
                    Attach and share documents directly from your Gmail inbox.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <Slack className="h-12 w-12" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Slack</h3>
                  <p className="text-muted-foreground">
                    Collaborate on hiring tasks with your team directly within Slack.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-400">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Customer Testimonials</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Hear what our satisfied customers have to say about our hiring management tool.
              </p>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6 bg-pink-500 text-pink-100">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs">HR Manager, Example Corp.</p>
                    </div>
                  </div>
                  <p>
                    "This tool has revolutionized our hiring process. It's easy to use and saves us a lot of time!"
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-pink-500 text-pink-100">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Sarah Miller</p>
                      <p className="text-xs">Recruiter, Tech Innovations</p>
                    </div>
                  </div>
                  <p>
                    "An amazing tool that has streamlined our recruitment process. The integrations are seamless."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-pink-500 text-pink-100">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Michael Johnson</p>
                      <p className="text-xs">Talent Acquisition, Global Enterprises</p>
                    </div>
                  </div>
                  <p>
                    "The best hiring tool we've used so far! It makes tracking applications a breeze."
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pricing</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Choose a plan that fits your needs and streamline your hiring process.
              </p>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6 bg-pink-600 text-pink-100">
                  <div className="space-y-2 text-center">
                    <h3 className="text-2xl font-bold">Basic</h3>
                    <p className="text-4xl font-bold">
                      $9<span className="text-2xl">/mo</span>
                    </p>
                  </div>
                  <ul className="grid gap-2 text-pink-100">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      5 Job Listings
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Email Notifications
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Basic Analytics
                    </li>
                  </ul>
                  <Button className="w-full bg-pink-700 text-pink-100">Get Started</Button>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-pink-700 text-pink-100">
                  <div className="space-y-2 text-center">
                    <h3 className="text-2xl font-bold">Pro</h3>
                    <p className="text-4xl font-bold">
                      $29<span className="text-2xl">/mo</span>
                    </p>
                  </div>
                  <ul className="grid gap-2 text-pink-100">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      50 Job Listings
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Priority Support
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Advanced Analytics
                    </li>
                  </ul>
                  <Button className="w-full bg-pink-800 text-pink-100">Get Started</Button>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-pink-800 text-pink-100">
                  <div className="space-y-2 text-center">
                    <h3 className="text-2xl font-bold">Enterprise</h3>
                    <p className="text-4xl font-bold">
                      $99<span className="text-2xl">/mo</span>
                    </p>
                  </div>
                  <ul className="grid gap-2 text-pink-100">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Unlimited Job Listings
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Dedicated Support
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Custom Integrations
                    </li>
                  </ul>
                  <Button className="w-full bg-pink-900 text-pink-100">Get Started</Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-pink-600 p-6 md:py-12 w-full text-pink-100">
        <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <a href="#">Features</a>
            <a href="#">Integrations</a>
            <a href="#">Pricing</a>
            <a href="#">Security</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <a href="#">Documentation</a>
            <a href="#">Help Center</a>
            <a href="#">Community</a>
            <a href="#">Templates</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default LandingPage;