"use client";
import Header from "@/components/layout/Header";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MenuPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setIsAdmin(data.admin);
      });
    });
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleCategorySubmit(e) {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editCategory) {
        data._id = editCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editCategory ? "PUT" : "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditCategory(null)
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(creationPromise, {
      loading: editCategory?'Updating category...':"Creating new category...",
      success: editCategory?'Updated category':"Added category",
      error: "Something went wrong!",
    });
  }

  return (
    <div>
      <Header />
      {isAdmin && <p className="my-8">Hello, I am admin</p>}
      <p className="">Categories</p>
      <div className="flex justify-between">
        <div className="grid grid-cols-4">
          {categories?.length > 0 &&
            categories.map((cat) => (
              <div className="flex flex-col text-center border-2 rounded-lg p-2">
                {cat.name}
                {isAdmin && (
                  <button
                    onClick={() => {
                      setEditCategory(cat);
                      setCategoryName(cat.name);
                    }}
                    className="bg-blue text-white px-6 py-2 rounded-full"
                  >
                    Edit
                  </button>
                )}
              </div>
            ))}
        </div>
        {isAdmin && (
          <form onSubmit={handleCategorySubmit} className="flex flex-col">
            <div className="flex justify-between">
              <p>{editCategory ? "Edit category" : "Add new category"}</p>
              <p>
                {editCategory && (
                  <span className="uppercase">{editCategory.name}</span>
                )}
              </p>
            </div>
            <input
              type="text"
              placeholder="Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border-2 py-2 px-4 my-2 rounded-lg outline-none"
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-full"
            >
              {editCategory ? "Update" : "Add"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
