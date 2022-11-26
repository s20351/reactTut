import { ReactElement, useContext, useState } from "react";
import { Breeding } from "../../components/breeding";
import { NotFound } from "../../components/errors/404";
import { NavBar } from "../../components/navBar";
import { FarmerContext } from "../../providers/FarmerDataProvider";
import { StyledAppLayout } from "../../styledApp";

const BreedingPage = (): ReactElement => {
  const { data } = useContext(FarmerContext);
  return (
    data.id != -1 ? 
    <>
      <NavBar/>
      <StyledAppLayout>
        {<Breeding />}
      </StyledAppLayout>
    </>
        : 
        <>
          <NotFound/>
        </>
  );
};

export { BreedingPage };
