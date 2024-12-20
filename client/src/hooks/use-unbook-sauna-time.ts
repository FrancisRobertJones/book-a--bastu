import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from '@/hooks/use-toast';
import { apiUrl } from '@/constants/api-url';

export const useUnbook = (onUnbookSuccess?: () => void) => {
    const [isUnbooking, setIsUnbooking] = useState<string | null>(null);
    const { getAccessTokenSilently } = useAuth0();

    const unbook = async (bookingId: string, role: string, userId?:string) => {
        let URI = "";
        if (role == "admin") {
            URI = `/adminbooking/${bookingId}/cancel/${userId}`
        } else if(role= "user") {
            URI = `/bookings/${bookingId}/cancel`
        }
        try {
            setIsUnbooking(bookingId);
            const token = await getAccessTokenSilently();
            const response = await fetch(`${apiUrl}/api${URI}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to cancel booking');
            }

            toast({
                title: "Booking Cancelled",
                description: "Your booking has been successfully cancelled.",
            });

            onUnbookSuccess?.(); 

        } catch (error) {
            console.error('Error cancelling booking:', error);
            toast({
                title: "Error",
                description: "Failed to cancel booking. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsUnbooking(null);
        }
    };

    return { unbook, isUnbooking };
};