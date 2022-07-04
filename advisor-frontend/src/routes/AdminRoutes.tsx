import { Route } from "react-router-dom";
import AdminInterface from "../pages/admin/AdminInterface/AdminInterface";
import ListOfIndividuals from "../pages/admin/ListOfIndividuals/ListOfIndividuals";
import Area from "../pages/admin/templates/Area/Area";
import ListOfTemplates from "../pages/admin/templates/ListOfTemplates/ListOfTemplates";
import Template from "../pages/admin/templates/Template/Template";
import INGTheme from "../Theme";

/**
 * Admin routes
 * @returns All the admin routes
 */
export const adminRoutes =  [
      // Admin interface
      <Route path="/admin" element={<AdminInterface />} />,
      // List of individuals
      <Route
        path="/admin/individuals"
        element={<ListOfIndividuals theme={INGTheme} />}
      />,
      // List of templates
      <Route
        path="/admin/templates"
        element={<ListOfTemplates theme={INGTheme} />}
      />,
      // Template
      <Route
        path="/admin/templates/:templateId"
        element={<Template theme={INGTheme} />}
      />,
      // Area
      <Route
        path="/admin/templates/:templateId/:areaId"
        element={<Area theme={INGTheme} />}
      />
];