import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState 
          title="Não autorizado"
          subtitle="Por favor faça o login"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    userId: currentUser.id
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title="Nenhuma viagen encontrada"
          subtitle="Parece que você não reservou nenhuma viagem"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient 
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default TripsPage