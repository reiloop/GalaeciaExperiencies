import CreateForm from "../components/CreateForm";
import EditForm from "../components/EditForm";
import EraseForm from "../components/EraseForm";
const AdminPage = (props) => {
  return (
    <div>
      <h2 style={{ fontWeight: "600" }}>Crear una experiencia</h2>
      <CreateForm></CreateForm>
      <h2 style={{ fontWeight: "600" }}>Editar una experiencia</h2>
      <EditForm></EditForm>
      <h2 style={{ fontWeight: "600" }}>Eliminar una experiencia</h2>
      <EraseForm></EraseForm>
    </div>
  );
};

export default AdminPage;
