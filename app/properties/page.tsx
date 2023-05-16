import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import PropertiesClient from "./PropertiesClient"

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";


const PropertiesPage = async () => {
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

  const listings = await getListings({
    userId: currentUser.id
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title="Nenhuma propriedade encontrada"
          subtitle="Parece que você não tem propriedades"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <PropertiesClient 
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default PropertiesPage;