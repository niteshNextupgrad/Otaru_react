"use client"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addNewContact } from '@/Services';
import SwalFire from '@/Helpers/SwalFire';

const schema = yup
    .object()
    .shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        message: yup.string().required("Message is required"),
    })
    .required();

export default function ContactForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await addNewContact(data);
            if (response?.success) {
                SwalFire("Contact", "success", response?.message);
                reset();
            }
        } catch (error) {
            console.error('failed to submit', error);
            SwalFire("Contact", "error", "Internal server error");
        }
    };

    return (
        <div className="col-lg-5 col-12 mx-auto mt-4">

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-sm-6 mb-3">
                        <input
                            type="text"
                            placeholder="Your Name"
                            {...register("name")}
                        />
                        {errors.name && <p className="text-danger">{errors.name.message}</p>}
                    </div>
                    <div className="col-sm-6 mb-3">
                        <input
                            type="email"
                            placeholder="Your e-mail"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-sm-12 mb-3 w-100">
                        <textarea
                            placeholder="Message"
                            rows={4}
                            {...register("message")}
                        />
                        {errors.message && <p className="text-danger">{errors.message.message}</p>}
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-sm-12 text-end" style={{ display: 'flex', justifyContent: 'end' }}>
                        <button type="submit" className="pageBtn">
                            Submit <i className="fw-bold fs-4 ri-arrow-right-s-fill"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
