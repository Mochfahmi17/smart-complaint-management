import AddComplaintForm from "./add-complaint-form";

const AddNewComplaint = () => {
  return (
    <section className="pt-24 pb-8">
      <div className="container mx-auto px-[3%]">
        <h1 className="text-2xl font-bold text-center">Buat Keluhan Baru</h1>
        <p className="text-slate-600 text-center">Laporkan masalah yang anda alami dengan lengkap dan jelas</p>

        {/* form */}
        <AddComplaintForm />
      </div>
    </section>
  );
};

export default AddNewComplaint;
