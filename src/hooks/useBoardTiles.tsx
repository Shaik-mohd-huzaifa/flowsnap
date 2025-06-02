
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface BoardTile {
  id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  user_id: string;
  created_at: string;
  updated_at: string;
}

export function useBoardTiles() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch board tiles
  const { data: boardTiles = [], isLoading, error } = useQuery({
    queryKey: ['board-tiles'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('board_tiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as BoardTile[];
    },
    enabled: !!user,
  });

  // Create board tile mutation
  const createBoardTileMutation = useMutation({
    mutationFn: async (tileData: { title: string; description?: string; status?: string; priority?: string }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('board_tiles')
        .insert([{
          title: tileData.title,
          description: tileData.description || null,
          status: tileData.status || 'todo',
          priority: tileData.priority || 'medium',
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board-tiles'] });
      toast({
        title: 'Board tile created',
        description: 'Your board tile has been created successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error creating board tile',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update board tile mutation
  const updateBoardTileMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BoardTile> & { id: string }) => {
      const { data, error } = await supabase
        .from('board_tiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board-tiles'] });
      toast({
        title: 'Board tile updated',
        description: 'Your board tile has been updated successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error updating board tile',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete board tile mutation
  const deleteBoardTileMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('board_tiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board-tiles'] });
      toast({
        title: 'Board tile deleted',
        description: 'Your board tile has been deleted successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error deleting board tile',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    boardTiles,
    isLoading,
    error,
    createBoardTile: createBoardTileMutation.mutate,
    updateBoardTile: updateBoardTileMutation.mutate,
    deleteBoardTile: deleteBoardTileMutation.mutate,
    isCreating: createBoardTileMutation.isPending,
    isUpdating: updateBoardTileMutation.isPending,
    isDeleting: deleteBoardTileMutation.isPending,
  };
}
