// import EmptyState from "../components/EmptyState";
// import getCurrentUser from "../actions/getCurrentUser";

// import getReservations from "../actions/getReservations";
// import ClientOnly from "../components/ClientsOnly";
// import ReservationsClient from "./ReservationsClient";

// const ReservationPage = async () => {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return (
//       <ClientOnly>
//         <EmptyState title="Unauthorized" subtitle="Please Login" />
//       </ClientOnly>
//     );
//   }

//   const reservations = await getReservations({
//     authorId: currentUser.id
//   });

//   if (reservations.length === 0) {
//     return (
//       <ClientOnly>
//         <EmptyState
//           title="No Reservations Found"
//           subtitle="Looks like you have no reservations on your properties"
//         />
//       </ClientOnly>
//     );
//   }

//   return (
//     <ClientOnly>
//       <ReservationsClient
//         reservations={reservations}
//         currentUser={currentUser}
//       />
//     </ClientOnly>
//   );
// };
 

// export default ReservationPage


import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientsOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly> 
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ReservationsPage;