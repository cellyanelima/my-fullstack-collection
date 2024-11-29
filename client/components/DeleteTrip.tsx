import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTrip } from '../apis/apiClient'

export default function DeleteTrip({ tripId }: { tripId: number }) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTrip(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trips'] }),
  })

  const isPending = deleteMutation.status === 'pending'

  const handleDelete = () => {
    deleteMutation.mutate(tripId)
  }

  return (
    <div className="travel-card-content">
      <button
        className="travel-card-button"
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  )
}
