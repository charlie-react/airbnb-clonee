// import EmptyState from "../components/EmptyState";
// import ClientOnly from "../components/ClientsOnly";

// import getCurrentUser from "../actions/getCurrentUser";
 
 
// import getListings from "../actions/getListings";
// import PropertiesClient from "./PropertiesClient";



// const PropertiesPage = async () => {
//   const currentUser = await getCurrentUser();
 

//   if (!currentUser) {
//     return (
//       <ClientOnly>
//         <EmptyState title="unauthorized" subtitle="Please login" />
//       </ClientOnly>
//     );
//   }

//   const listings = await getListings({
//     userId: currentUser.id,
//   });

//   if (listings.length === 0) {
//     return (
//       <ClientOnly>
//         <EmptyState
//           title="No properties found"
//           subtitle="Looks like you have no properties"
//         />
//       </ClientOnly>
//     );
//   }

//   return (
//     <ClientOnly>
//       <PropertiesClient listings ={listings} currentUser={currentUser}   />
//     </ClientOnly>
//   );
// };

// export default PropertiesPage;


import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientsOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default PropertiesPage;