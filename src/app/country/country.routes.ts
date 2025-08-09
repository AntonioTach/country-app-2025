import { Routes } from "@angular/router";
import { ByCapitalPageComponent } from "./pages/by-capital-page/by-capital-page.component";

export const countryRoutes: Routes = [
  {
    path: 'by-capital',
    component: ByCapitalPageComponent
  },

];

export default countryRoutes;
