import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { FileId, FileMetadata } from '../backend';
import { ExternalBlob } from '../backend';

export function useListFiles() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<{ fileId: FileId; metadata: FileMetadata }>>({
    queryKey: ['files'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFiles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFile(fileId: FileId | null) {
  const { actor, isFetching } = useActor();

  return useQuery<{ blob: ExternalBlob; metadata: FileMetadata } | null>({
    queryKey: ['file', fileId],
    queryFn: async () => {
      if (!actor || !fileId) return null;
      return actor.getFile(fileId);
    },
    enabled: !!actor && !isFetching && !!fileId,
  });
}

export function useUploadFile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      blob,
      filename,
      size,
      contentType,
    }: {
      blob: ExternalBlob;
      filename: string;
      size: bigint;
      contentType: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.uploadFile(blob, filename, size, contentType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
}
