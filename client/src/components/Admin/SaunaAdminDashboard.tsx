import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CreateInviteForm from '@/components/SaunaInvites/Invite';
import { SaunaUserInvites } from '@/components/SaunaInvites/SaunaInvites';
import { SaunaUserManagement } from '@/components/Admin/SaunaUserManagement';
import { SaunaStatsCard } from './SaunaStats';


const SaunaAdminDashboard = () => {
    const { saunaId } = useParams<{ saunaId: string }>();

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6">Sauna Dashboard</h1>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="invite">Invites</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="bookings">Bookings</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sauna Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {saunaId &&
                                <SaunaStatsCard saunaId={saunaId} />
                            }
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="invite">
                    <Card>
                        <CardHeader>
                            <CardTitle>Invite a new user to your sauna</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {saunaId &&
                                <>
                                    <CreateInviteForm saunaId={saunaId} />
                                    <SaunaUserInvites saunaId={saunaId} />
                                </>
                            }
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SaunaUserManagement />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default SaunaAdminDashboard