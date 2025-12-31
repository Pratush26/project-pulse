"use client"
import { useForm } from "react-hook-form"
import '@/Utils/styles/form.css'
import { toast } from "react-toastify"
import { useContext } from "react"
import { FeedbackModalContext } from "@/Contexts/Context"
import { RxCross2 } from "react-icons/rx"
import { PiWarningCircle } from "react-icons/pi";
import { createFeedback } from "@/app/actions/Feedback"

export default function FeedbackForm() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    const { modalOpened, setModalOpened, currentProject } = useContext(FeedbackModalContext)
    if (!modalOpened) return null
    const formSubmit = async (data) => {
        data.projecId = currentProject?._id
        try {
            const res = await createFeedback(data)

            if (res?.success) {
                toast.success(res?.message || "Successfully submitted")
                reset()
            }
            else toast.error(res?.message || "Failed to submit feedback")

        } catch (err) {
            console.error(err)
            toast.error(err?.message || "Something went wrong!")
        }
    };
    return (
        <section className="fixed bg-(--base-300) text-foreground z-90 right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 p-6 shadow-md/40 rounded-2xl w-5/6 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className="w-full flex items-center justify-between gap-2">
                <span>
                    <h4 className="font-semibold">Feedback Form</h4>
                    <p>{currentProject.title}</p>
                </span>
                <button onClick={() => setModalOpened(false)} type="button" className="cursor-pointer">
                    <RxCross2 />
                </button>
            </div>
            <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col items-center justify-center gap-2 w-full">
                <div className="w-full">
                    {errors.comment ? <p className="text-sm text-rose-600">{errors.comment.message}</p> : <label htmlFor="comment">Comment :</label>}
                    <textarea {...register("comment", { required: "comment is required" })} placeholder="Enter your comment" id="comment" />
                </div>
                <div className="w-full grid grid-cols-2 items-end-safe justify-items-start">
                    {errors.flag ? <p className="text-sm text-rose-600">{errors.flag.message}</p> : <label htmlFor="flag">Flag :</label>}
                    <input type="checkbox" {...register("flag")} placeholder="Enter flag" id="flag" />
                </div>
                <span className="text-xs text-gray-500 pl-2 w-full flex items-center gap-0.5"><PiWarningCircle size={13} /><p>Flags projects when dissatisfied</p></span>
                <div className="w-full">
                    {errors.rating ? <p className="text-sm text-rose-600">{errors.rating.message}</p> : <label htmlFor="rating">Rating :</label>}
                    <select className="bg-(--primary) px-4 py-2" {...register("rating", { required: "rating is required" })} defaultValue="5" name="rating" id="rating" >
                        <option value="5">⭐⭐⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="1">⭐</option>
                    </select>
                </div>
                <button disabled={isSubmitting} className={`btn trns btn-primary mt-3 rounded-md`}>{isSubmitting ? "Submitting..." : "Submit"}</button>
            </form>
        </section>
    )
}