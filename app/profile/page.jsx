"use client";
import Header from "@/components/layout/Header";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/Firebase";
const storage = getStorage(app);

export default function ProfilePage() {
  const session = useSession();
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [file, setFile] = useState(""); //image
  const [newImage, setNewImage] = useState(""); //image url
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [city, setCity] = useState("");
  const { status } = session;

  useEffect(() => {
    const upload = () => {
      const uniqueName = new Date().getTime + file.name;
      const storageRef = ref(storage, uniqueName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setNewImage(downloadURL);
          });
        }
      );
    };
    file && upload();
  }, [file]);

  useEffect(() => {
    if (status === "authenticated") {
      setUsername(session.data.user.name);
      setUserImage(session.data.user.image);
      fetch('api/profile').then(response=>{
        response.json().then(data=>{
          setNewImage(data.image)
          setPhone(data.phone);
          setAddress(data.address);
          setPin(data.pin);
          setCity(data.city)
        })
      })
    }
  }, [status, session]);

  async function handleProfileUpdate(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({
        name: username,
        image: newImage,
        phone,
        address,
        pin,
        city,
      }),
    });
    if (response.ok) {
      setSaving(false);
      setSaved(true);
    }
  }

  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const email = session.data.user.email;

  return (
    <section>
      <Header />
      <h1 className="mt-8 text-center ">Profile page</h1>
      <div className=" max-w-xl  mx-auto my-12 ">
        <div className="flex gap-8 ">
          <div className="w-1/3 flex flex-col gap-2 items-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4">
              {userImage ||newImage ? (
                <Image
                  src={newImage ? newImage : userImage}
                  alt=""
                  fill
                  objectFit="cover"
                />
              ) : (
                <Image
                  src={"/userIcon.png"}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            <div className="">
              <input
                type="file"
                id="image"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />

              <button className="">
                <label
                  htmlFor="image"
                  className="border-primary border-2 py-1 rounded-lg px-4 cursor-pointer"
                >
                  Edit
                </label>
              </button>
            </div>
          </div>
          <div className="flex flex-col w-2/3 gap-4">
            <input
              type="text"
              required
              placeholder="Full name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className=" border-b-2 outline-none bg-white text-gray-800"
            />
            <input
              type="text"
              disabled
              value={email}
              className=" text-gray-600 border-b-2 outline-none "
            />
            <input
              type="tel"
              placeholder="Contact number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className=" border-b-2 outline-none bg-white"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className=" border-b-2 outline-none bg-white"
            />
            <input
              type="number"
              placeholder="PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className=" border-b-2 outline-none bg-white"
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className=" border-b-2 outline-none bg-white"
            />
          </div>
        </div>
        <button
          onClick={handleProfileUpdate}
          className="w-full bg-primary mt-8 py-2 rounded-lg"
        >
          Save
        </button>
        {saving && (
          <div className="border text-gray-800 bg-sky-100 py-2 items-center text-center mt-8 rounded-lg">
            Saving changes...
          </div>
        )}
        {saved && (
          <div className="border text-gray-800 bg-sky-200 py-2 items-center text-center mt-8 rounded-lg">
            Updated successfully
          </div>
        )}
      </div>
    </section>
  );
}
