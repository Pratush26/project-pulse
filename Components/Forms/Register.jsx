"use client"

import { useForm } from "react-hook-form"
import '@/Utils/styles/form.css'
import { registerUser } from "@/app/actions/User"
import { showToast } from "@/Utils/ShowToast"

export default function RegistrationForm() {
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm()
  const formSubmit = async (data) => {
    if (!imageFile) {
      showToast({ type: "warning", msg: "Profile photo is required" });
      return;
    }
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", `${process.env.NEXT_PUBLIC_Cloudinary_Upload_Preset}`);
    formData.append("folder", "user_images");
    try {
      const ImgRes = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_Cloudinary_CloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadResult = await ImgRes.json();
      data.photo = uploadResult.secure_url;
      const res = await registerUser(data);
      if (res.success) showToast({ type: "success", msg: res.message || "Successfully registered user" });
      else showToast({ type: "error", msg: res.message || "Something went wrong!" });

      console.log("Final submit payload:", data);
      reset();

    } catch (err) {
      console.error(err)
      showToast({ type: "error", msg: "Something went wrong!" });
    }
  };
  return (
    <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col items-center justify-center gap-2 w-full">
      <div className="w-full">
        {errors.name ? <p className="text-sm text-rose-600">{errors.name.message}</p> : <label htmlFor="name">Name :</label>}
        <input type="text" {...register("name")} placeholder="Enter your name" id="name" />
      </div>
      <div className="w-full">
        {errors.email ? <p className="text-sm text-rose-600">{errors.email.message}</p> : <label htmlFor="email">Email :</label>}
        <input type="email" {...register("email")} placeholder="Enter your email" id="email" />
      </div>
      <div className="w-full">
        {errors.phone ? <p className="text-sm text-rose-600">{errors.phone.message}</p> : <label htmlFor="phone">phone :</label>}
        <input type="tel" {...register("phone")} placeholder="Enter phone" id="phone" />
      </div>
      <div className="w-full">
        {errors.photo ? <p className="text-sm text-rose-600">{errors.photo.message}</p> : <label htmlFor="image">Profile Photo :</label>}
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImageFile(file);
              setValue("photo", "selected", {
                shouldValidate: true,
              });
            }
          }}
        />
      </div>

      <input type="hidden" {...register("photo")} />
      <div className="w-full">
        {errors.password ? <p className="text-sm text-rose-600">{errors.password.message}</p> : <label htmlFor="password">password :</label>}
        <input type="password" {...register("password")} placeholder="Enter password" id="password" />
      </div>
      <div className="w-full">
        {errors.address ? <p className="text-sm text-rose-600">{errors.address.message}</p> : <label htmlFor="address">Address :</label>}
        <textarea {...register("address")} placeholder="Enter your address" id="address" />
      </div>
      <button disabled={isSubmitting} className={`btn trns btn-primary`}>{isSubmitting ? "Registering..." : "Register"}</button>
    </form>
  )
}