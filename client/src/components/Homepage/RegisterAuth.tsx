import { useAuth0 } from '@auth0/auth0-react'
import { motion } from 'framer-motion'
import { ChevronRight, Users, Building2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthSection() {
  const { loginWithRedirect } = useAuth0()

  const handleUserLogin = () => {
    localStorage.setItem('register_intent', 'user');

    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/callback`,
      },
    });
  };
  
  const handleAdminLogin = () => {
    localStorage.setItem('register_intent', 'admin');
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/callback`,
      },
    });
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Revolutionize Your Sauna Management
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Modernize your sauna bookings with our cutting-edge digital platform. Streamline operations, enhance user experience, and boost your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Sauna Users</CardTitle>
                <CardDescription>
                  Book and manage your sauna sessions with ease
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    Easy online booking system
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    Real-time availability check
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    Automated reminders
                  </li>
                </ul>
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleUserLogin}
                >
                  Register as a User
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <Building2 className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Sauna Owners</CardTitle>
                <CardDescription>
                  Manage your sauna business efficiently
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    Complete management dashboard
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    Booking analytics and insights
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    Customer management tools
                  </li>
                </ul>
                <Button 
                  className="w-full" 
                  size="lg" 
                  variant="outline"
                  onClick={handleAdminLogin}
                >
                  Register as an Admin
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}