import AddProjectForm from "@/Components/Forms/AddProject";

export default function CreateProject() {
    return (
        <main className="my-10 w-full">
            <h1 className="text-4xl font-semibold text-center m-6">Create Project</h1>
            <section className="bg-(--base-200) flex flex-col w-1/3 mx-auto items-center gap-2 p-8 rounded-2xl">
                <AddProjectForm />
            </section>
        </main>
    )
}