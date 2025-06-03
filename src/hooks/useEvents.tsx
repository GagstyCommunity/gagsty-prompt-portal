
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Event {
  id: string;
  title: string;
  description: string;
  event_type: string;
  start_date: string;
  end_date: string;
  reward_pool: number;
  max_participants: number;
  status: string;
  created_at: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) throw error;

      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const registerForEvent = async (eventId: string, userId: string) => {
    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert({
          event_id: eventId,
          user_id: userId
        });

      if (error) throw error;

      return { success: true };
    } catch (err) {
      console.error('Error registering for event:', err);
      return { success: false, error: err };
    }
  };

  return {
    events,
    loading,
    error,
    registerForEvent,
    refetch: fetchEvents
  };
};
