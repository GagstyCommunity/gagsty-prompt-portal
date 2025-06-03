
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Coins, Clock } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const DynamicEventsList = () => {
  const { events, loading, registerForEvent } = useEvents();
  const { user } = useAuth();

  const handleRegister = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register for events.",
        variant: "destructive",
      });
      return;
    }

    const result = await registerForEvent(eventId, user.id);
    
    if (result.success) {
      toast({
        title: "Registration Successful!",
        description: "You've been registered for this event.",
      });
    } else {
      toast({
        title: "Registration Failed",
        description: "Unable to register for this event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'active': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="gagsty-card animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="flex space-x-4">
                  <div className="h-8 bg-gray-700 rounded w-20"></div>
                  <div className="h-8 bg-gray-700 rounded w-24"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const activeEvents = events.filter(event => event.status === 'upcoming' || event.status === 'active');

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gagsty-primary">Live Events & Challenges</h3>
      
      {activeEvents.length === 0 ? (
        <Card className="gagsty-card">
          <CardContent className="text-center py-12">
            <Calendar className="mx-auto text-gray-600 mb-4" size={48} />
            <p className="text-gagsty-secondary">No active events at the moment</p>
            <p className="text-gagsty-secondary text-sm mt-2">Check back soon for new challenges!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {activeEvents.map((event) => (
            <Card key={event.id} className="gagsty-card gagsty-lift-hover">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-gagsty-primary text-xl mb-2">
                      {event.title}
                    </CardTitle>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-500 mb-2">
                      <Coins className="mr-1" size={16} />
                      <span className="font-semibold">{event.reward_pool.toLocaleString()}</span>
                    </div>
                    <p className="text-gagsty-secondary text-sm">Prize Pool</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gagsty-secondary mb-4 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gagsty-secondary">
                    <Calendar className="mr-2" size={16} />
                    <span className="text-sm">
                      {formatDate(event.start_date)} - {formatDate(event.end_date)}
                    </span>
                  </div>
                  
                  {event.max_participants && (
                    <div className="flex items-center text-gagsty-secondary">
                      <Users className="mr-2" size={16} />
                      <span className="text-sm">Max {event.max_participants} participants</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-gagsty-secondary">
                    <Clock className="mr-2" size={16} />
                    <span className="text-sm">{event.event_type}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleRegister(event.id)}
                  className="btn-gagsty-primary"
                  disabled={event.status === 'completed'}
                >
                  {event.status === 'completed' ? 'Event Completed' : 'Join Event'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicEventsList;
