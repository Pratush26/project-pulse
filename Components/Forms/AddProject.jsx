"use client"
import { useForm } from "react-hook-form"
import '@/Utils/styles/form.css'
import { toast } from "react-toastify"
import { createProject } from "@/app/actions/Project"

export default function AddProjectForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const formSubmit = async (data) => {
    try {
      const res = await createProject(data)

      if (res?.success) {
        toast.success(res?.message || "Successfully created project")
        reset()
      }
      else toast.error(res?.message || "Failed to create project")

    } catch (err) {
      console.error(err)
      toast.error( err?.message || "Something went wrong!")
    }
  };
  return (
    <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col items-center justify-center gap-2 w-full">
      <div className="w-full">
        {errors.title ? <p className="text-sm text-rose-600">{errors.title.message}</p> : <label htmlFor="title">Project Title :</label>}
        <input type="text" {...register("title", { required: "title is required" })} placeholder="Enter project title" id="title" />
      </div>
      <div className="w-full">
        {errors.type ? <p className="text-sm text-rose-600">{errors.type.message}</p> : <label htmlFor="type">Project type :</label>}
        <input type="text" {...register("type", { required: "type is required" })} placeholder="Enter project type" id="type" />
      </div>
      <div className="w-full">
        {errors.description ? <p className="text-sm text-rose-600">{errors.description.message}</p> : <label htmlFor="description">Description :</label>}
        <textarea {...register("description", { required: "description is required" })} placeholder="Enter project description" id="description" />
      </div>
      <div className="w-full">
        {errors.endDate ? <p className="text-sm text-rose-600">{errors.endDate.message}</p> : <label htmlFor="endDate">Ending Date :</label>}
        <input type="date" {...register("endDate", { required: "end date is required" })} placeholder="Enter an ending date" id="endDate" />
      </div>
      <button disabled={isSubmitting} className={`btn trns btn-primary mt-3`}>{isSubmitting ? "Creating..." : "Create"}</button>
    </form>
  )
}