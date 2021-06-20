import CreateForm from "../components/CreateForm";
import EditForm from "../components/EditForm";

const AdminPage = (props) => {
  return (
    <div>
      <h2 style={{ fontWeight: "600" }}>Crear una experiencia</h2>
      <CreateForm></CreateForm>
      <h2 style={{ fontWeight: "600" }}>Editar una experiencia</h2>
      <EditForm></EditForm>
    </div>
  );
};

export default AdminPage;
