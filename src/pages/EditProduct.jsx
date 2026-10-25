import { useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Product</h1>
      <p>Editing Product ID: {id}</p>
    </div>
  );
}

export default EditProduct;