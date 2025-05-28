import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { motion } from 'framer-motion';
import { CgProfile } from 'react-icons/cg';
import {
  toast,
  ToastContainer,
} from 'react-toastify';

const API_BASE_URL = "http://localhost:8082";

// Retrieve JWT token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token"); // Ensure token is stored in localStorage after login
};

const CategoryCreate = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState(editingCategory?.name || "");
  const [selectedImage, setSelectedImage] = useState(editingCategory?.image || null);
  const [showPopup, setShowPopup] = useState(false); // Added based on your usage
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Fetch categories from backend
  useEffect(() => {
    fetchCategories();
  }, []);
  

  const fetchCategories = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/category/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle file input
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !selectedImage) {
      alert("Please provide all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(`${API_BASE_URL}/category/add`, formData, {
        headers: {
          // Authorization: `Bearer ${token}`, // Add if needed
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Category added successfully!");
        setShowForm(false);           // ✅ Corrected this line
        setEditingCategory(null);     // Optional cleanup
        setCategoryName("");          // Clear input
        setSelectedImage(null);       // Clear image
        fetchCategories();            // Refresh the category list
      }
    } catch (error) {
      toast.error("Error saving category:", error);
      // alert("❌ Failed to add category.");
    }
  };

  //Update

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    if (!editingCategory || !categoryName) {
      alert("Please provide all required fields.");
      return;
    }
  
    const formData = new FormData();
    formData.append("id", editingCategory.id); // required by requestMap
    formData.append("name", categoryName);     // required by requestMap
  
    // Send image only if selected
    if (selectedImage) {
      formData.append("image", selectedImage); // optional MultipartFile
    }
  
    try {
      const response = await axios.post(`${API_BASE_URL}/category/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`, // include if your backend requires JWT
        },
      });
  
      if (response.status === 200) {
        toast.success("Category updated successfully!");
        setShowForm(false);
        setEditingCategory(null);
        setCategoryName("");
        setSelectedImage(null);
        fetchCategories(); // reload the list
      }
    } catch (error) {
      toast.error("Error updating category:", error);
      // alert("❌ Failed to update category.");
    }
  };
  


  // Delete category
  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this category?")) {
  //     try {
  //       const response = await axios.delete(`${API_BASE_URL}/category/delete/${id}`);
  
  //       if (response.status === 200) {
  //         toast.success("Category deleted successfully!");
  //         fetchCategories();  // Re-fetch categories to update the list
  //       }
  //     } catch (error) {
  //       toast.error("❌ Error deleting category:", error);
  //       // alert("❌ Failed to delete category.");
  //     }
  //   }
  // };
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/category/delete/${categoryToDelete}`);
      toast.success("Category deleted successfully!");
      setShowDeleteConfirm(false);
      fetchCategories(); // reload the menu
    } catch (err) {
      console.error("Error deleting Category:", err);
      toast.error("Failed to delete Category.");
    }
  };
  
  const deleteCategory = (id) => {
    setCategoryToDelete(id);
    setShowDeleteConfirm(true);
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };
  

  return (
    <div className="space-y animate-fadeIn">
      <nav className="text-black py-6 px-6 flex items-center justify-end">
        <CgProfile className="w-12 h-12 rounded-full border border-gray-300 shadow-lg" />
      </nav>

      <h2 className="text-3xl font-bold text-center mb-9 text-gray-800">
        🍔 Category Management
      </h2>

      <button
        onClick={() => setShowForm(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Add New Category
      </button>

      <input
        type="text"
        placeholder="Search Category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[50%] border items-center ml-[190px] rounded-md pl-6 p-2 mb-8"
      />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="p-6 bg-white rounded-lg w-96">
            <h3 className="text-2xl font-bold mb-4">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h3>
            

<form onSubmit={editingCategory ? handleUpdate : handleSubmit}>
      <input
        type="text"
        placeholder="Enter category name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        required
        className="w-full border rounded-md p-2 mb-2"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border rounded-md p-2 mb-2"
        required={!editingCategory}
      />

{selectedImage && (
  <img
    src={
      selectedImage instanceof File
        ? URL.createObjectURL(selectedImage) // New uploaded image
        : `http://localhost:8082/images/${selectedImage}` // Existing image from backend
    }
    alt="Preview"
    className="w-full h-32 object-cover rounded-md mb-2"
  />
)}


      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {editingCategory ? "Save Changes" : "Add Category"}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowForm(false);
            setSelectedImage(null);
            setCategoryName("");
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </form>
          </div>
        </div>
      )}

      {/* Display Categories */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Category Name</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories
            .filter((category) =>
              category.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((category, index) => (
              <tr key={category.id} className="border border-gray-300 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={`${API_BASE_URL}/images/${category.image}`}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  
<button
  onClick={() => {
    setEditingCategory({
      id: category.id,
      name: category.name,
      image: category.image || null,
    });
    setCategoryName(category.name);         // pre-fill the name field
    setSelectedImage(category.image || null); // set existing image filename
    setShowForm(true);                      // open the form modal
  }}
  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
>
  Edit
</button>


                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="px-3 ml-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                  
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showDeleteConfirm && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        initial={{ opacity: 0.5, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg text-center"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
        >
          <h3 className="text-2xl font-bold mb-4">Confirm Deletion</h3>
          <p>Are you sure you want to delete this Menu?</p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={confirmDelete}  
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Yes, Delete
            </button>
            <button
              onClick={cancelDelete}
              className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

    </div>
  );
};

export default CategoryCreate;
