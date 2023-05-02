import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState 
          title="Não autorizado"
          subtitle="Por favor faça o login"
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id
  });

  if (reservations.length === 0 ) {
    return (
      <ClientOnly>
        <EmptyState 
          title="Nenhuma reserva encontrada"
          subtitle="parece que você não tem reservas em suas propriedades"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationsClient 
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ReservationsPage