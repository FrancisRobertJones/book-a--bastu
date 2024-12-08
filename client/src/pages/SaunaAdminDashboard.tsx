import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CreateInviteForm from '@/components/SaunaInvites/Invite';
import { SaunaUserInvites } from '@/components/SaunaInvites/SaunaInvites';
import { SaunaUserManagement } from '@/components/Admin/SaunaUserManagement';


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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Total Bookings</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-bold">0</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Active Users</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-bold">0</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Today's Bookings</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-bold">0</p>
                                    </CardContent>
                                </Card>
                            </div>
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