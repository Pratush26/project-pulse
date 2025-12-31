"use client"
import { useForm } from "react-hook-form"
import '@/Utils/styles/form.css'
import { toast } from "react-toastify"
import { createProject } from "@/app/actions/Project"
import { useContext } from "react"
import { FeedbackModalContext } from "@/Contexts/Context"
import { RxCross2 } from "react-icons/rx"

export default function FeedbackForm() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    const { modalOpened, setModalOpened, currentProject } = useContext(FeedbackModalContext)
    if (!modalOpened) return null
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
            toast.error(err?.message || "Something went wrong!")
        }
    };
    return (
        <section className="fixed bg-(--base-300) text-foreground z-90 right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 p-6 shadow-md/40 rounded-2xl w-5/6 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className="w-full flex items-center justify-between gap-2">
                <span>
                    <h4 className="font-semibold">Choose Client</h4>
                    <p>{currentProject.title}</p>
                </span>
                <button onClick={() => setModalOpened(false)} type="button" className="cursor-pointer">
                    <RxCross2 />
                </button>
            </div>
            <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col items-center justify-center gap-2 w-full">
                <div className="w-full">
                    {errors.feedback ? <p className="text-sm text-rose-600">{errors.feedback.message}</p> : <label htmlFor="feedback">Feedback :</label>}
                    <textarea {...register("feedback", { required: "feedback is required" })} placeholder="Enter your feedback" id="feedback" />
                </div>
                <button disabled={isSubmitting} className={`btn trns btn-primary mt-3 rounded-md`}>{isSubmitting ? "Submitting..." : "Submit"}</button>
            </form>
        </section>
    )
}